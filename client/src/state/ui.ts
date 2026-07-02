import { makeVar } from '@apollo/client/cache';

export const darkModeVar = makeVar<boolean>(false);
export const sidebarOpenVar = makeVar<boolean>(true);
export const selectedTagsVar = makeVar<string[]>([]);
