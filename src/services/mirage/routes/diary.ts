import { Response, Request } from "miragejs";
import { handleErrors } from "../server";
import { User } from "../../../interfaces/user.interface";

import { Diary } from "../../../interfaces/diary.interface";
import dayjs from "dayjs";
import { Entry } from "../../../interfaces/entry.interface";


// Create diaries
export const create = (
  scheme: any,
  req: Request
): { user: User; diary: Diary } | Response => {
  try {
    const { title, type, userId } = JSON.parse(
      req.requestBody
    ) as Partial<Diary>;
    const exUser = scheme.users.findBy({ id: userId });
    if (!exUser) {
      return handleErrors(null, "No such user exist");
    }

    const now = dayjs().format();
    const diary = exUser.createDiary({
      title,
      type,
      createdAt: now,
      updatedAt: now,
    });

    return {
      user: {
        ...exUser.attrs,
      },
      diary: diary.attrs,
    };
  } catch (error) {
    return handleErrors(error, "Failed to create diary");
  }
};

// Update diary
export const updateDiary = (scheme: any, req: Request): Diary | Response => {
  try {
    const diary = scheme.diaries.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<Diary>;
    const now = dayjs().format();

    diary.update({
      ...data,
      updatedAt: now,
    });
    return diary.attrs as Diary;
  } catch (error) {
    return handleErrors(error, "Failed to update Diary.");
  }
};

// Get Diaries
export const getDiaries = (scheme: any, req: Request): Diary[] | Response => {
  try {
    const user = scheme.users.find(req.params.id);
    return user.diary as Diary[];
  } catch (error) {
    return handleErrors(error, "Could not get user diaries");
  }
};

//Add Diaries
export const addEntry = (
  scheme: any,
  req: Request
): { diary: Diary; entry: Entry } | Response => {
  try {
    const diary = scheme.diaries.find(req.params.id);
    const { title, content } = JSON.parse(req.requestBody) as Partial<Entry>;
    const now = dayjs().format();
    const entry = diary.createEntry({
      title,
      content,
      createdAt: now,
      updatedAt: now,
    });
    diary.update({
      ...diary.attrs,
      updatedAt: now,
    });
    return {
      diary: diary.attrs,
      entry: entry.attrs,
    };
  } catch (error) {
    return handleErrors(error, "Failed to save entry");
  }
};

//Get Entries

export const getEntries = (
  scheme: any,
  req: Request
): { entries: Entry[] } | Response => {
  try {
    const diary = scheme.diaries.find(req.params.id);
    return diary.entry;
  } catch (error) {
    return handleErrors(error, "Failed to get Diary entries");
  }
};

//Update Entry
export const updateEntry = (
  schema: any,
  req: Request
): Entry  | Response => {
  try {
    const entry = schema.entries.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<Entry>;
    const now = dayjs().format();
    entry.update({
      ...data,
      updatedAt: now,
    });
    return entry.attrs as Entry;
  } catch (error) {
    return handleErrors(error, "Failed to update entry");
  }
};




