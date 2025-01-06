import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiPaths } from "@/services/paths";
import {
  TGenerateProjectRequest,
  TGenerateProjectResponse,
} from "@/services/types";

enum ETags {
  PROJECT = "project",
}

export const createProjectApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://run.mocky.io/v3" }),
  tagTypes: Object.values(ETags),
  endpoints: (builder) => {
    return {
      postGenerateProject: builder.mutation<
        TGenerateProjectResponse,
        TGenerateProjectRequest
      >({
        query: (body) => ({
          method: "POST",
          url: apiPaths.generateProject,
          body,
        }),
        invalidatesTags: [ETags.PROJECT],
      }),
    };
  },
});

export const { usePostGenerateProjectMutation } = createProjectApi;
