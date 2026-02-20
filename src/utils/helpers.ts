import appConfig from "@/configs/app.config";
import { DropdownItem } from "./types";
import dayjs from "dayjs";
import { DATE_FORMAT_WITH_DATE_AND_TIME, DATE_FORMAT_WITH_MM_DD_YYYY } from "./constants";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { format, parse, isValid, addMinutes } from "date-fns";
import duration from "dayjs/plugin/duration";

import { store } from "@/redux/store";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export const maskSSN = (ssn: string) => {
  console.log("ssn====", ssn);
  if (!ssn) return "";
  return `###-##-${ssn.slice(-4)}`;
};

// export const formatPhoneNumber = (phone: string): string => {
//   if (!phone) return ""; // Return default format if phone is null/undefined/empty
//   const cleaned = phone.replace(/\D/g, "");
//   if (cleaned.length === 10) {
//     return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
//   }
//   return "+1 (___) ___-____"; // Default masked format
// };
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "").slice(-10); // keep last 10
  if (!digits) return "";

  const area = digits.slice(0, 3);
  const mid = digits.slice(3, 6);
  const last = digits.slice(6);

  if (digits.length <= 3) return `+1 (${area}`;
  if (digits.length <= 6) return `+1 (${area}) ${mid}`;
  return `+1 (${area}) ${mid}-${last}`;
};
export const formatSSN = (ssn: string) => {
  if (!ssn) return "";
  console.log("formatSSN====", ssn);
  return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 9)}`;
};

export const generateProfileImageUrl = (url: string) => {
  const generatedUrl = `${appConfig.legacyApiBase}/assets/images/avatars/${url}`;
  return generatedUrl;
};

export const formatTimeDisplay = (displayDate: string, utcDate?: string): string => {
  if (!displayDate) return "";

  const targetDateForDiff = utcDate || displayDate;
  const utcTime = dayjs.utc(targetDateForDiff);
  const now = dayjs();
  const duration = dayjs.duration(now.diff(utcTime));

  let minutes = duration.asMinutes();
  const hours = duration.asHours();
  const years = duration.asYears();

  if (minutes < 0) {
    minutes = 0;
  }

  if (minutes < 60) {
    const minsFixed = minutes.toFixed(0);
    return `${minsFixed} ${minsFixed === "1" ? "mins ago" : "mins ago"}`;
  } else if (hours < 24) {
    const hoursFixed = hours.toFixed(0);
    return `${hoursFixed} ${hoursFixed === "1" ? "hrs ago" : "hrs ago"}`;
  } else if (hours >= 24 && hours < 48) {
    return "yesterday";
  } else if (years < 1) {
    return dayjs(displayDate).format("MMM DD, hh:mm a");
  } else {
    return dayjs(displayDate).format("MMM DD YYYY, hh:mm a");
  }
};
// export const formatTimeDisplay = (utcDateTime: string): string => {
//   if (!utcDateTime) return "";

//   // Interpret as Arizona time since the backend sends local time without offset
//   const utcDate = dayjs.tz(utcDateTime, "America/Phoenix");
//   const now = dayjs();

//   const diffMs = now.diff(utcDate);
//   const diffDurations = dayjs.duration(diffMs);

//   let minutes = diffDurations.asMinutes();
//   const hours = diffDurations.asHours();
//   const years = diffDurations.asYears();

//   if (minutes < 0) minutes = 0;

//   if (minutes < 60) {
//     return `${Math.floor(minutes)} ${Math.floor(minutes) === 1 ? "minute" : "mins ago"}`;
//   }

//   if (minutes > 60 && hours < 24) {
//     return `${Math.floor(hours)} ${Math.floor(hours) === 1 ? "hour" : "hrs ago"}`;
//   }

//   if (hours > 24 && hours < 48) {
//     return "yesterday";
//   }

//   if (years < 1) {
//     return utcDate.format("MMM DD, hh:mm a");
//   }

//   return utcDate.format("MMM DD YYYY, hh:mm a");
// };
export const formatTaskDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/\s(AM|PM)/, (match) => match.toLowerCase());
};

export const transformSearchTerm = (searchTerm: string | null): string | null => {
  if (!searchTerm) return searchTerm;

  // Check if the search term matches yyyy-MM-dd format (2021-12-28)
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (isoDateRegex.test(searchTerm.trim())) {
    // Transform to MM/DD/YYYY format which might be what the API expects
    const [year, month, day] = searchTerm.trim().split("-");
    return `${month}/${day}/${year}`;
  }

  // Check if the search term matches MM/DD/YYYY format (already correct)
  const usDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (usDateRegex.test(searchTerm.trim())) {
    return searchTerm.trim();
  }

  // Check for text date format like "Mar 21, 1987", "March 21, 1987", "Mar 21,1987"
  const textDateRegex = /^([A-Za-z]{3,9})\s+(\d{1,2}),?\s*(\d{4})$/;
  const textDateMatch = searchTerm.trim().match(textDateRegex);
  if (textDateMatch) {
    const [, monthName, day, year] = textDateMatch;

    // Month name to number mapping
    const monthMap: { [key: string]: string } = {
      jan: "01",
      january: "01",
      feb: "02",
      february: "02",
      mar: "03",
      march: "03",
      apr: "04",
      april: "04",
      may: "05",
      jun: "06",
      june: "06",
      jul: "07",
      july: "07",
      aug: "08",
      august: "08",
      sep: "09",
      september: "09",
      oct: "10",
      october: "10",
      nov: "11",
      november: "11",
      dec: "12",
      december: "12",
    };

    const monthNum = monthMap[monthName.toLowerCase()];
    if (monthNum) {
      const paddedDay = day.padStart(2, "0");
      return `${monthNum}/${paddedDay}/${year}`;
    }
  }

  // Check if the search term matches DD/MM/YYYY format
  const ukDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  // Note: This is ambiguous with US format, so we'll assume US format by default

  // Check for other date formats like DD-MM-YYYY
  const ddmmyyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
  if (ddmmyyyyRegex.test(searchTerm.trim())) {
    const [day, month, year] = searchTerm.trim().split("-");
    return `${month}/${day}/${year}`;
  }

  // Return the original search term if no date format detected
  return searchTerm;
};

export const formatToISODate = (dateString: string, formatString: string) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);

    if (isValid(date)) {
      // Convert to UTC by offsetting the timezone difference
      const utcDate = addMinutes(date, date.getTimezoneOffset());
      // Format as MM/dd/yy hh:mm AM/PM using date-fns
      return format(utcDate, formatString);
    }
  } catch (error) {
    console.warn("Invalid date format:", dateString);
  }

  return dateString;
};

export const havePermission = (enumVal: string | string[]): boolean => {
  let currentPermissionHash: string[] = [];
  if (Array.isArray(enumVal)) {
    currentPermissionHash = enumVal;
  } else {
    currentPermissionHash.push(enumVal);
  }

  // Get logged in user information from Redux store
  const state = store.getState();
  const user = state.auth.user;

  let permissions: string | undefined;

  if (user != undefined) {
    permissions = user.userPermissionHash;
  } else {
    // Fallback to localStorage for Playwright tests
    permissions = localStorage.getItem("userPermissionHash") || undefined;
  }

  if (permissions == undefined || permissions.length == 0) {
    return false;
  }

  const per: string[] = permissions.match(/.{1,4}/g) || [];
  let ans: boolean = false;
  for (const p of per) {
    currentPermissionHash.forEach((element) => {
      if (p == element) {
        ans = true;
      }
    });
  }
  return ans;
};

export const ErrorMessageCodeText = (code: string): string | null => {
  const errorCodes: any = {
    ["CalculateAccountOpportunityEndDate.UnknownError"]:
      "Opportunity Cannot be created. Already exists with selected date(s).",
    ["Opportunity.AlreadyExists"]:
      "An opportunity already exists with the same type or date range.",
    ["Accounts.Enrolled.Or.Activated.Contacts.Not.Exists"]:
      "Drexi Component not available OR Member(s) are not exists with status: Enrolled/Activated OR Push To Drexi already in-process.",
    ["Accounts.AlreadyClient"]: "This is already a client.",
  };

  return errorCodes[code] ?? null;
};

export const isCanaryEnvironment = () => appConfig.nodeEnv === "canary";

export const getTerminationStatusMessage = (terminationDate?: string) => {
  if (!terminationDate) return null;

  const termination = new Date(terminationDate);
  const now = new Date();

  const isPast = termination.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0);

  const formatted = format(termination, DATE_FORMAT_WITH_MM_DD_YYYY);

  return isPast
    ? `This Group was terminated on: ${formatted}`
    : `This Group will be terminated on: ${formatted}`;
};
