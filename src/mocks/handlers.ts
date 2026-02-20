import { http, HttpResponse } from "msw";
import appConfig from "@/configs/app.config";
import claimsMock from "./mockData/claimsMock.json";

export const handlers = [
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
