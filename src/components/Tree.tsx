import { useMemo } from "react";

export type TreeProps = {
    paths: string[];
    onClick: (path: string) => void;
};

export const Tree = ({ paths, onClick }: TreeProps) => {
    const sortedPaths = useMemo(() => paths.sort(), [paths])

    return <div>
        <h3 className="px-2 text-xl mb-4">Files</h3>
        <ul>
            {sortedPaths.map((path, index) => {
                return <li
                    onClick={() => onClick(path)}
                    className="p-1 px-2 hover:bg-gray-100 hover:cursor-pointer rounded"
                    key={index}>
                    {path}
                </li>
            })}
        </ul>
    </div>
}