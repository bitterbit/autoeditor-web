import { useRef, useState } from "react";

export type ChatProps = {
};

export const Chat = ({ }: ChatProps) => {
    const [messages, setMessages] = useState<string[]>([])

    const addMessage = (msg: string) => {
        setMessages(messages.concat([msg]))
    }

    const inputElement = useRef<HTMLInputElement>(null);

    return <>
        <ul className="mb-8">
            {messages.map((msg, i) => {
                return <li key={i}>{msg}</li>
            })}
        </ul>
        <form onSubmit={(e) => {
            e.preventDefault()
            if (inputElement.current?.value) {
                addMessage(inputElement.current.value)
                inputElement.current.value = '';
            }
        }}>
            <input
                ref={inputElement}
                type="text"
                placeholder="Write your message!"
                className="w-full pl-6 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md py-3">
            </input>
        </form>
    </>
}

