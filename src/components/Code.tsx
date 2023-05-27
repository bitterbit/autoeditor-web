import { useCallback, useEffect, useMemo, useState } from "react";

export type CodeContext = {
    path: string;
    lineStart: number;
    lineEnd: number;
}

export type Range = {
    start: number;
    end: number;
};

type CodeLine = {
    line: string;
    index: number;
    selected: boolean;
}

export type CodeProps = {
    content: string;
    path: string;
    onRangeChange: (range: Range) => void;
}

export const Code = ({ content, path, onRangeChange }: CodeProps) => {
    const [range, setRange] = useState<Range>({ start: 0, end: 0 });

    // each time path changes, reset the selection range
    useEffect(() => {
        setRange({ start: 0, end: 0 })
    }, [path])

    const updateStart = (start: number) => {
        setRange((prevRange) => ({
            ...prevRange,
            start,
        }));
    }
    const updateEnd = (end: number) => {
        setRange((prevRange) => ({
            ...prevRange,
            end: end + 1,
        }));
    }

    const resetRange = () => {
        setRange({ start: 0, end: 0 });
    }

    useEffect(() => {
        onRangeChange(range);
    }, [range])

    const isInRange = (line: number) => {
        return line >= range.start && line < range.end;
    }

    const lines: CodeLine[] = useMemo(() => {
        return content.split('\n').map((content, i) => ({
            line: content,
            index: i,
            selected: isInRange(i),
        }))
    }, [content, range])

    const lineClick = useCallback((line: number) => {
        // nothing selected
        if (range.start === 0 && range.end === 0) {
            updateStart(line);
            updateEnd(line);
            return
        }

        // line is before range
        if (line < range.start) {
            updateStart(line);
            return
        }

        // line is included or after range
        updateEnd(line);
    }, [range]);


    return <>
        <h2 className="text-xl mb-8">
            {path}
        </h2>
        <div className="rounded border border-gray-500 border-solid mb-2 p-1 mr-2 text-gray-900">
            <a className="cursor-pointer hover:underline" onClick={() => resetRange()}>reset</a>
            <span className="mx-1">|</span>
            <span>selection {range.start} to {range.end}</span>
        </div>

        <pre className="mx-2">
            {lines.map((line, i) => {
                return <code
                    key={i}
                    onClick={() => lineClick(i)}
                    className={`block hover:bg-gray-100 cursor-pointer ${line.selected ? 'text-blue-700' : ''}`}>
                    {line.line}
                </code>
            })}
        </pre >
    </>
}