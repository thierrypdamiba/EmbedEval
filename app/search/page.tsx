"use client";

import { ChatWindow } from '@/components/ChatWindow';
import { useState } from 'react';

export default function SearchPage() {
  const [embeddingModel, setEmbeddingModel] = useState("text-embedding-ada-002");
  const [chatModel, setChatModel] = useState("openai");

  function handleModelChange(e: string) {
    setChatModel(e);
  }

  function formatAIResponse(response: string) {
    return (
      <div>
        <p className="whitespace-pre-wrap">{response}</p>
      </div>
    );
  }

  const InfoCard = (
    <div className="rounded bg-[#25252d] w-full max-h-[85%] margin-auto">
      <h1 className="text-3xl md:text-4xl mb-4">Meeting Search</h1>
      <p>
        This tool allows you to search through meeting transcripts and summaries using advanced language models.
      </p>
      <br />
      <h2>How to use:</h2>
      <ol className="list-decimal list-inside">
        <li>The embedding model is set to OpenAI's text-embedding-ada-002 for optimal performance.</li>
        <li>Choose a chat model below to process your queries.</li>
        <li>Use the input area to ask questions about meetings or search for specific information.</li>
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
        Start by asking questions about meetings, participants, decisions, or any other relevant information!
      </p>
    </div>
  );

  return (
    <ChatWindow
      endpoint={`api/chat/search?embeddingModel=${embeddingModel}&chatModel=${chatModel}`}
      emptyStateComponent={InfoCard}
      showIntermediateStepsToggle={true}
      placeholder={"Search for meeting information, e.g., 'What was discussed in the last marketing meeting?'"}
      emoji="🔍"
      formatResult={formatAIResponse}
    />
  );
}