import LoginForm from "@/components/auth/forms/login-form";
import { FormattedMessage } from "@/components/intl/formatters";
export default function LoginPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="container flex flex-col items-center">
        <h1 className="text-xl font-semibold">
          <FormattedMessage id="auth.loginTitle" />
        </h1>
        <p className="text-center text-sm text-foreground/50">
          <FormattedMessage id="auth.loginDescription" />
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
