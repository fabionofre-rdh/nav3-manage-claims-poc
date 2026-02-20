import { cloneElement } from "react";
import type { CommonProps } from "@/@types/common";
import WarningBanner from "../PostLoginLayout/components/WarningBanner";
import { isCanaryEnvironment } from "@/utils/helpers";

type SideProps = CommonProps;

const Side = ({ children, ...rest }: SideProps) => {
  return (
    <>
      {isCanaryEnvironment() && (
        <WarningBanner
          title="NOTICE: Canary Environment"
          subtitle="This is a canary environment connected to PRODUCTION database. Please refrain from testing with sensitive data."
        />
      )}
      <div className="flex h-full p-6 bg-white dark:bg-gray-800">
        <div className=" flex flex-col justify-center items-center flex-1">
          <div className="w-full xl:max-w-[450px] px-8 max-w-[380px]">
            {children
              ? cloneElement(children as React.ReactElement, {
                  ...rest,
                })
              : null}
          </div>
        </div>
        <div className="py-6 px-10 lg:flex flex-col flex-1 justify-between hidden rounded-3xl items-end relative xl:max-w-[520px] 2xl:max-w-[720px]">
          <img
            src="/img/others/auth-side-bg.png"
            className="absolute h-full w-full top-0 left-0 rounded-3xl"
          />
        </div>
      </div>
    </>
  );
};

export default Side;
