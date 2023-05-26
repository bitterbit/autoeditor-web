import { useState } from 'react'

import { getTrackedFiles } from '@buf/galtashma_editor.bufbuild_connect-query/editor/server-GitService_connectquery'
// import type {FileList} from '@buf/galtashma_editor.bufbuild_es/editor/server_pb'
import { useQuery } from '@tanstack/react-query';


export const Layout = () => {
    const { data, isLoading, error } = useQuery(getTrackedFiles.useQuery({}));
    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <pre>
                <code>
                    Loading: {isLoading}<br/>
                    Error: {error?.message || ''}<br/>
                    Data: {data?.files || '...'}<br/>
                </code>
            </pre>
        </>
    )
}