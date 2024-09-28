"use client";

import { ChatWindow } from "@/components/ChatWindow";
import { useState } from "react";

export default function RecommendPage() {
  const [embeddingModel, setEmbeddingModel] = useState("text-embedding-ada-002");
  const [chatModel, setChatModel] = useState("openai");

  function handleModelChange(e: string) {
    setChatModel(e);
  }

  function formatAIResponse(response: string) {
    const sections = response.split('\n\n');
    return (
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        {sections.map((section, index) => {
          const [title, ...content] = section.split('\n');
          return (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-bold mb-2 text-blue-600">{title.replace(':', '')}</h2>
              {title.includes('Topics:') ? (
                <ul className="list-disc pl-5">
                  {content.map((item, i) => (
                    <li key={i} className="mb-1">{item.replace(/^\d+\.\s/, '')}</li>
                  ))}
                </ul>
              ) : (
                <p className="whitespace-pre-wrap">{content.join('\n')}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  const InfoCard = (
    <div className="rounded bg-[#25252d] w-full max-h-[85%] margin-auto">
      <h1 className="text-3xl md:text-4xl mb-4">Meeting Recommendations</h1>
      <p>
        This tool recommends meetings based on your role and goals using advanced language models.
      </p>
      <br />
      <h2>How to use:</h2>
      <ol className="list-decimal list-inside">
        <li>The embedding model is set to OpenAI's text-embedding-ada-002 for optimal performance.</li>
        <li>Choose a chat model below to process your queries.</li>
        <li>Enter your role and goal to receive personalized meeting recommendations.</li>
      </ol>
      <br />
      <h2>Choose A Chat Model</h2>
      <select
        name="chatModel"
        id="chatModel"
        onChange={(e) => handleModelChange(e.target.value)}
        className="bg-black"
      >
        <option value="openai">OpenAI</option>
        <option value="anthropic">Anthropic</option>
      </select>
      <br />
      <br />
      <p>
        Start by entering your role and goal to get meeting recommendations!
      </p>
    </div>
  );

  return (
    <ChatWindow
      endpoint={`api/chat/recommend?embeddingModel=${embeddingModel}&chatModel=${chatModel}`}
      emptyStateComponent={InfoCard}
      showIntermediateStepsToggle={false}
      placeholder={"Enter your role and goal, e.g., 'I'm a marketing manager aiming to increase brand awareness.'"}
      emoji="🗓️"
      formatResult={formatAIResponse}
    />
  );
}