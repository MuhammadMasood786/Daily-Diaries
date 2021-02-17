import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "../../interfaces/entry.interface";

interface EditorState {
  canEdit: boolean;
  isEditing: Entry | null;
  activeDiaryId: string | null;
}

const initialState: EditorState = {
  canEdit: false,
  isEditing: null,
  activeDiaryId: null,
};

const editor = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCanEdit: (state, { payload }: PayloadAction<boolean>) => {
      state.canEdit = payload != null ? payload : !state.canEdit;
    },
    setCurrentEditing: (state, { payload }: PayloadAction<Entry | null>) => {
      state.isEditing = payload;
    },
    setActiveDiaryId: (state, { payload }: PayloadAction<string>) => {
      state.activeDiaryId = payload;
    },
  },
});

const { setActiveDiaryId, setCanEdit, setCurrentEditing } = editor.actions;
export default editor.reducer;
