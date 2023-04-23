import { useRef, useState, useEffect } from 'react';
import Layout from '@/components/layout';
import styles from '@/styles/Chat.module.css';
import { Message } from '@/types/chat';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import LoadingDots from '@/components/ui/LoadingDots';
import { Document } from 'langchain/document';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useRouter } from 'next/router';
import getColors from 'get-image-colors';
import { hex } from 'chroma-js';

async function getColorPallete(filePath: string) {
  return await getColors(filePath + '.png', { count: 2 });
}

function getMessageState(title: string) {
  return {
    messages: [
      {
        message: `Hi, ask me anything about ${title}!`,
        type: 'apiMessage',
      },
    ],
    history: [],
  };
}

function linkToPDF(title: string) {
  let url = '';
  switch (title) {
    case 'OpenIntro Statistics':
      url = 'public-docs/stats/Intro Stats.pdf';
      break;
    case 'Elementary Principles of Chemical Processes':
      url = 'public-docs/stats/ElementaryChemical.pdf';
      break;
    default:
      url = 'public-docs/english/Williams Style 11th edition.pdf';
  }
  return (
    <a target="_blank" href={url}>
      here
    </a>
  );
}

export default function Chat() {
  const router = useRouter();

  const [filePath, setFilePath] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
    // @ts-ignore
  }>(getMessageState(title));

  const { messages, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Update Avatar image based on text
  const botAvatarSrc = `https://robohash.org/${filePath}.png?size=400x400&set=set4`;

  // generate document metadata
  // background & accent colors
  const [themeColors, setThemeColors] = useState([hex('#FFF'), hex('#000')]);

  const styleLighter = {
    backgroundColor: themeColors[0].brighten(1.25).hex(),
    color: themeColors[1].darken(1.25).hex(),
    borderColor: themeColors[0].hex(),
  };
  const styleDarker = {
    backgroundColor: themeColors[0].hex(),
    color: themeColors[1].hex(),
    borderColor: themeColors[0].brighten(1.25).hex(),
  };

  // On Page Load:
  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  useEffect(() => {
    // @ts-ignore
    setMessageState(getMessageState(title));
  }, [title]);

  useEffect(() => {
    if (router.isReady) {
      setFilePath(router.query.filePath as string);
      setTitle(router.query.title as string);
      getColorPallete(router.query.filePath as string).then((colors) => {
        setThemeColors(colors);
      });
    }
  }, [router.isReady, router.query]);

  //handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();

    setError(null);

    if (!query) {
      alert('Please input a question');
      return;
    }

    const question = query.trim();
    console.log(question);

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
    }));

    setLoading(true);
    setQuery('');

    try {
      const formatted_question = question.replaceAll('book', title).trim();
      const response = await fetch('api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: formatted_question,
          history,
          filePath,
        }),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: data.text,
              sourceDocs: data.sourceDocuments,
            },
          ],
          history: [...state.history, [question, data.text]],
        }));
      }

      setLoading(false);

      //scroll to bottom
      messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      console.log('error', error);
    }
  }

  //prevent empty submissions
  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e);
    } else if (e.key == 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <>
      <Layout styleDarker={styleDarker} styleLighter={styleLighter}>
        <div
          className="mx-auto flex flex-col gap-4"
          style={{ ...styleLighter, padding: 20 }}
        >
          <h1 className="text-2xl font-bold leading-[1.1] tracking-tighter text-center">
            Chat With Your Textbook
          </h1>
          <p>
            Read the full textbook <b>{linkToPDF(title)}</b>.
          </p>
          <main className={styles.main}>
            <div
              style={{ borderColor: themeColors[1].hex() }}
              className={styles.cloud}
            >
              <div ref={messageListRef} className={styles.messagelist}>
                {messages.map((message, index) => {
                  let icon;
                  let className;
                  if (message.type === 'apiMessage') {
                    icon = (
                      <Image
                        key={index}
                        src={botAvatarSrc}
                        loader={() => botAvatarSrc}
                        alt="AI"
                        width="40"
                        height="40"
                        className={styles.boticon}
                        priority
                      />
                    );
                    className = styles.apimessage;
                  } else {
                    icon = (
                      <Image
                        key={index}
                        src="/usericon.png"
                        alt="Me"
                        width="40"
                        height="40"
                        className={styles.usericon}
                        priority
                      />
                    );
                    // The latest message sent by the user will be animated while waiting for a response
                    className =
                      loading && index === messages.length - 1
                        ? styles.usermessagewaiting
                        : styles.usermessage;
                  }
                  return (
                    <>
                      <div key={`chatMessage-${index}`} className={className}>
                        {icon}
                        <div className={styles.markdownanswer}>
                          <ReactMarkdown linkTarget="_blank">
                            {message.message}
                          </ReactMarkdown>
                        </div>
                      </div>
                      {message.sourceDocs && (
                        <div
                          className="p-5"
                          key={`sourceDocsAccordion-${index}`}
                        >
                          <Accordion
                            type="single"
                            collapsible
                            className="flex-col"
                          >
                            {message.sourceDocs.map((doc, index) => {
                              return (
                                <div key={`messageSourceDocs-${index}`}>
                                  <AccordionItem value={`item-${index}`}>
                                    <AccordionTrigger>
                                      <h3>Source {index + 1}</h3>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <ReactMarkdown linkTarget="_blank">
                                        {doc.pageContent}
                                      </ReactMarkdown>
                                      <p className="mt-2">
                                        <b>Source:</b>{' '}
                                        {doc.metadata.source.substring(
                                          doc.metadata.source.lastIndexOf('/') +
                                            1,
                                        )}
                                      </p>
                                    </AccordionContent>
                                  </AccordionItem>
                                </div>
                              );
                            })}
                          </Accordion>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
            <div>
              Suggested Questions:
              <input
                type="button"
                value="What is the subject of the textbook?"
                color="primary"
                onClick={
                  () => setQuery('What is the subject of the textbook?')
                  //handleSubmit
                }
                className={styles.generatesuggestion}
                disabled={loading}
              >

              </input>
              <input
                type="button"
                value="What are the main ideas of the textbook?"
                onClick={
                  () => setQuery('What are the main ideas of the textbook?')
                  //handleSubmit
                }
                className={styles.generatesuggestion}
              ></input>
              <input
                type="button"
                value="Make a review guide for the textbook."
                onClick={
                  () => setQuery('Make a review guide for the textbook.')
                  //{handleSubmit}
                }
                className={styles.generatesuggestion}
              ></input>
            </div>
            <div className={styles.center}>
              <div className={styles.cloudform}>
                <form onSubmit={handleSubmit}>
                  <textarea
                    style={{ borderColor: themeColors[1].hex() }}
                    disabled={loading}
                    onKeyDown={handleEnter}
                    ref={textAreaRef}
                    autoFocus={false}
                    rows={1}
                    maxLength={512}
                    id="userInput"
                    name="userInput"
                    placeholder={
                      loading
                        ? 'Waiting for response...'
                        : 'Enter your question here'
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.textarea}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.generatebutton}
                  >
                    {loading ? (
                      <div className={styles.loadingwheel}>
                        <LoadingDots color="#000" />
                      </div>
                    ) : (
                      // Send icon SVG in input field
                      <svg
                        viewBox="0 0 20 20"
                        className={styles.svgicon}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    )}
                  </button>
                </form>
              </div>
            </div>
            {error && (
              <div className="border border-red-400 rounded-md p-4">
                <p className="text-red-500">{error}</p>
              </div>
            )}
          </main>
        </div>
        <footer className="m-auto p-4">
          <a
            style={styleDarker}
            target="_blank"
            href="https://lahacks.com/live/home"
          >
            Made for LA Hacks
          </a>
        </footer>
      </Layout>
    </>
  );
}
