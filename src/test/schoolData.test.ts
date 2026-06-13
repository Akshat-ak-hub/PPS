import { describe, it, expect } from "vitest";
import { schoolInfo, announcements, faculty, feeStructure } from "@/data/schoolData";

describe("schoolInfo", () => {
  it("has required fields", () => {
    expect(schoolInfo.name).toBeTruthy();
    expect(schoolInfo.tagline).toBeTruthy();
    expect(schoolInfo.founded).toBeGreaterThan(0);
    expect(schoolInfo.address).toBeTruthy();
    expect(schoolInfo.phone).toBeTruthy();
  });
});

describe("announcements", () => {
  it("has at least one announcement", () => {
    expect(announcements.length).toBeGreaterThan(0);
  });

  it("each announcement has required fields", () => {
    for (const a of announcements) {
      expect(a.id).toBeGreaterThan(0);
      expect(a.title).toBeTruthy();
      expect(a.date).toBeTruthy();
      expect(a.description).toBeTruthy();
    }
  });
});

describe("faculty", () => {
  it("has at least one faculty member", () => {
    expect(faculty.length).toBeGreaterThan(0);
  });
});

describe("feeStructure", () => {
  it("has at least one fee entry", () => {
    expect(feeStructure.length).toBeGreaterThan(0);
  });
});
