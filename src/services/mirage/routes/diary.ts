import { Response, Request } from "miragejs";
import { handleErrors } from "../server";
import { User } from "../../../interfaces/user.interface";
import { randomBytes } from "crypto";
import { Diary } from "../../../interfaces/diary.interface";
import dayjs from "dayjs";

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
