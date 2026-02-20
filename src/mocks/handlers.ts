import { http, HttpResponse } from "msw";
import appConfig from "@/configs/app.config";
import claimsMock from "./mockData/claimsMock.json";
import usersMock from "./mockData/usersMock.json";
import teamsMock from "./mockData/teamsMock.json";
import edcPlansMock from "./mockData/edcPlansMock.json";
import hosPlansMock from "./mockData/hosPlansMock.json";
import groupsMock from "./mockData/groupsMock.json";
import statusesMock from "./mockData/statusesMock.json";

export const handlers = [
  http.get(`${appConfig.apiBase}/claimDataTemp/users`, () => {
    return HttpResponse.json(usersMock);
  }),

  http.get(`${appConfig.apiBase}/claimDataTemp/teams`, () => {
    return HttpResponse.json(teamsMock);
  }),

  http.get(`${appConfig.apiBase}/claimDataTemp/edc-plans`, () => {
    return HttpResponse.json(edcPlansMock);
  }),

  http.get(`${appConfig.apiBase}/claimDataTemp/hos-plans`, () => {
    return HttpResponse.json(hosPlansMock);
  }),

  http.get(`${appConfig.apiBase}/claimDataTemp/groups`, () => {
    return HttpResponse.json(groupsMock);
  }),

  http.get(`${appConfig.apiBase}/claimDataTemp/statuses`, () => {
    return HttpResponse.json(statusesMock);
  }),

  http.get(`${appConfig.apiBase}/claimDataTemp/claims`, () => {
    return HttpResponse.json(claimsMock);
  }),

  http.get(`${appConfig.apiBase}/claimDataTemp/claims/by-claim/:id`, ({ params }) => {
    const claim = claimsMock.data.find((c) => c.claimId === params.id);
    if (!claim) {
      return HttpResponse.json(
        { data: null, statusCode: 404, message: "Claim not found" },
        { status: 404 }
      );
    }
    return HttpResponse.json({ data: claim, statusCode: 200, message: "Success" });
  }),

  http.patch(`${appConfig.apiBase}/claimDataTemp/claims/by-claim/:id`, async ({ params, request }) => {
    const claim = claimsMock.data.find((c) => c.claimId === params.id);
    if (!claim) {
      return HttpResponse.json(
        { data: null, statusCode: 404, message: "Claim not found" },
        { status: 404 }
      );
    }
    const body = await request.json() as Record<string, unknown>;
    const { member: _m, family: _f, completedBy: _cb, completedDate: _cd, claimsBucket: _bk, ...claimFields } = claim;
    const updated = { ...claimFields, ...body, lastUpdatedAt: new Date().toISOString() };
    return HttpResponse.json({ data: updated, statusCode: 200, message: "Claim updated successfully" });
  }),
];
