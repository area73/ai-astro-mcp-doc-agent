import { h } from "preact";
import { useState } from "preact/hooks";

export default function DocExpertChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("DocExpertChat renderizado");

  const sendMessage = async () => {
    console.log("sendMessage llamada. input:", input);
    if (!input) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.openai.com/v1/t hreads/runs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.PUBLIC_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent: "docexpert",
          input: input,
        }),
      });
      console.log("res--->", res);
      const data = await res.json();
      console.log("Respuesta de la API:", data);
      const assistantMessage = { role: "assistant", content: data.output };
      setMessages([...messages, userMessage, assistantMessage]);
    } catch (error) {
      console.error("Error en sendMessage:", error);
      setMessages([
        ...messages,
        userMessage,
        { role: "assistant", content: "Ocurrió un error: " + error },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    console.log("Input cambiado:", e.target.value);
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Enter presionado en input");
      sendMessage();
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            {m.content}
          </div>
        ))}
        {loading && <div className="message assistant">Pensando...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
      <style>{`
        .chat-widget { max-width: 600px; margin: auto; padding: 2rem; }
        .chat-window { border: 1px solid #ccc; padding: 1rem; height: 400px; overflow-y: scroll; }
        .message { margin-bottom: 1rem; }
        .message.user { text-align: right; font-weight: bold; }
        .message.assistant { text-align: left; }
        .chat-input { display: flex; gap: 1rem; margin-top: 1rem; }
      `}</style>
    </div>
  );
}
