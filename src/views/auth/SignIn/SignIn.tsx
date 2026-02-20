import Logo from "@/components/template/Logo";
import Alert from "@/components/ui/Alert";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux/store";
import { Button } from "@/components/ui";
import { useCallback } from "react";
import { useAuth } from "@/auth";
import { getUser } from "@/redux/slices/authSlice";

export const SignInBase = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useTimeOutMessage();
  const { signIn } = useAuth();
  const mode = useSelector((state: AppState) => state.theme.mode);

  const onClickSignIn = useCallback(async () => {
    try {
      await signIn();
      dispatch(getUser());
    } catch {
      setMessage("Failed to sign in");
    }
  }, [setMessage, signIn, dispatch]);

  return (
    <>
      <div className="mb-8">
        <Logo type="streamline" mode={mode} imgClass="mx-auto" logoWidth={60} />
      </div>
      <div className="mb-10">
        <h2 className="mb-2">Welcome back!</h2>
        <p className="font-semibold heading-text">Please click on the button below to sign in!</p>
      </div>
      {message && (
        <Alert showIcon className="mb-4" type="danger">
          <span className="break-all">{message}</span>
        </Alert>
      )}
      <Button block variant="solid" type="button" onClick={onClickSignIn}>
        Sign In
      </Button>
    </>
  );
};

const SignIn = () => {
  return <SignInBase />;
};

export default SignIn;
