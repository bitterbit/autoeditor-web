import { getFileDetails, getTrackedFiles } from '@buf/galtashma_editor.bufbuild_connect-query/editor/server-GitService_connectquery'
// import type {FileList} from '@buf/galtashma_editor.bufbuild_es/editor/server_pb'
import { useQuery } from '@tanstack/react-query';
import { Tree } from './components/Tree';
import { useMemo, useState } from 'react';
import { Chat } from './components/Chat';


export const Layout = () => {
    const [selectedPath, setSelectedPath] = useState<string | null>(null)

    const { data: tarckedFilesResponse, isLoading, error } = useQuery(getTrackedFiles.useQuery({}));

    const { data: fileDetails, isLoading: isFileLoading, error: fileError } = useQuery(getFileDetails.useQuery({ filename: selectedPath || '' }));

    const fileContent = useMemo(() => {
        if (isFileLoading) {
            return "Loading...";
        }

        if (fileError) {
            return "Error";
        }

        return fileDetails.content;
    }, [isFileLoading, fileError, fileDetails])

    return (
        <>
            <div className='flex justify-start p-12'>
                <div className='max-w-[20%] mr-4'>
                    <Tree paths={tarckedFilesResponse?.files || []} onClick={(path: string) => { setSelectedPath(path) }} />
                </div>
                <div className='basis-1/2'>
                    <pre><code>{fileContent}</code></pre>
                </div>
                <div className='flex-grow bg-gray-100 p-4'>
                    <Chat />
                </div>
            </div>
            <div>
                <pre>
                    <code>
                        Loading: {isLoading}<br />
                        Error: {error?.message || ''}<br />
                    </code>
                </pre>
            </div>
        </>
    )
}