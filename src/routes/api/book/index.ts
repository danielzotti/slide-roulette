import {type RequestHandler} from '@builder.io/qwik-city';
import {getBook, getLine, getLines, getPage} from "~/db/book";

export const onGet: RequestHandler = async ({json, url}) => {
    const pageParam = url.searchParams.get('page');
    const lineParam = url.searchParams.get('line');
    const page = pageParam ? parseInt(pageParam, 10) : null;
    const line = lineParam ? parseInt(lineParam, 10) : null;
    const isArray = typeof url.searchParams.get('asArray') === "string"

    const hasPage = !!page;
    const hasLine = !!line;
    const hasValidPage = !!page && page >= 1 && page <= 10;
    const hasValidLine = !!line && line >= 1 && line <= 14;

    if (!hasPage && !hasLine) {
        json(200, getBook({isArray}));
        return;
    }

    if (hasValidPage && !hasLine) {
        json(200, getPage({page, isArray}));
        return;
    }

    if (!hasPage && hasValidLine) {
        json(200, getLines({line, isArray}));
        return;
    }

    if (!hasValidPage || !hasValidLine) {
        json(404, {error: 'Not found'});
        return;
    }

    json(200, getLine({page, line, isArray}));
    return;
};
