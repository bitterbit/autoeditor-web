import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { modifyCode } from '@buf/galtashma_editor.bufbuild_connect-query/editor/server-GitService_connectquery'
import { useQuery } from '@tanstack/react-query';
import { CodeContext } from "./Code";

type ChatModificationItemProps = {
    codeContext: CodeContext;
    prompt: string;
};

const ChatModificationItem = ({ codeContext, prompt }: ChatModificationItemProps) => {
    const { data, isLoading, error } = useQuery({
        ...modifyCode.useQuery({
            prompt: prompt,
            ...codeContext,
        }),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    })

    if (isLoading || error) {
        return <div className="border rounded p-1 border-gray-300 my-1">
            <span className="block text-xs mb-1">{codeContext.path} {codeContext.lineStart}:{codeContext.lineEnd}</span>
            <span className="block text-sm font-semibold">{prompt}</span>
            {isLoading && <span className="block text-sm text-blue-200">Loading...</span>}
            {error && <span className="block text-sm text-red-500">{error.message}</span>}
        </div>
    }

    return <div className="border rounded p-1 border-gray-300 my-1">
        <span className="block text-xs mb-1">{codeContext.path} {codeContext.lineStart}:{codeContext.lineEnd}</span>
        <span className="block text-sm font-bold">{prompt}</span>
    </div>
}

export type ChatProps = {
    codeContext: CodeContext;
};

export const Chat = ({ codeContext }: ChatProps) => {
    const [prompts, setPrompts] = useState<ChatModificationItemProps[]>([])

    const addPrompt = useCallback((prompt: string, codeContext: CodeContext) => {
        setPrompts(prompts.concat([{
            prompt,
            codeContext,
        }]));
    }, [prompts])

    useEffect(() => {
        console.log('prompts updated', prompts.length)
    }, [prompts])

    const inputElement = useRef<HTMLInputElement>(null);
    return <>
        <ul className="mb-8">
            {prompts.map((item: ChatModificationItemProps, i: number) => {
                return <li key={i}>
                    <ChatModificationItem {...item} />
                </li>
            })}
        </ul>
        <form onSubmit={(e) => {
            e.preventDefault()
            if (inputElement.current?.value) {
                addPrompt(inputElement.current.value, { ...codeContext })
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
