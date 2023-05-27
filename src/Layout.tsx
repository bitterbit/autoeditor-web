import { getFileDetails, getTrackedFiles } from '@buf/galtashma_editor.bufbuild_connect-query/editor/server-GitService_connectquery'
import { useQuery } from '@tanstack/react-query';
import { Tree } from './components/Tree';
import { useMemo, useState } from 'react';
import { Chat } from './components/Chat';
import { Code, CodeContext, Range } from './components/Code';


export const Layout = () => {
    const [codeContext, setCodeContext] = useState<CodeContext>({
        path: '',
        lineStart: 0,
        lineEnd: 0,
    })

    const { data: tarckedFilesResponse, isLoading, error } = useQuery(getTrackedFiles.useQuery({}));

    const { data: fileDetails, isLoading: isFileLoading, error: fileError } = useQuery(getFileDetails.useQuery({
        filename: codeContext.path
    }));

    const fileContent = useMemo(() => {
        if (isFileLoading) {
            return "Loading...";
        }

        if (fileError) {
            return "Error";
        }

        return fileDetails.content;
    }, [isFileLoading, fileError, fileDetails])


    const selectPath = (path: string) => {
        setCodeContext((prev) => ({
            ...prev,
            path: path,
        }))
    }

    return (
        <>
            <div className='flex justify-start p-12'>
                <div className='max-w-[20%] mr-4'>
                    <Tree
                        paths={tarckedFilesResponse?.files || []}
                        onClick={(path: string) => { selectPath(path) }} />
                </div>
                <div className='basis-1/2 max-w-[50%]'>
                    <Code content={fileContent} path={codeContext.path} onRangeChange={(range: Range) => {
                        setCodeContext((prev) => {
                            return {
                                ...prev,
                                lineStart: range.start,
                                lineEnd: range.end,
                            }
                        })

                    }} />
                </div>
                <div className='flex-grow bg-gray-100 p-4'>
                    <Chat codeContext={codeContext} />
                </div>
            </div>
        </>
    )
}