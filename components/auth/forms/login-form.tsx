"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, LogIn, User } from "lucide-react";
import React, { useCallback } from "react";
import { ModulesRoutes } from "@/config/routes";
import { toast } from "@/components/ui/use-toast";
import { useLoginForm } from "@/lib/auth/hooks";
import { useRouter } from "next13-progressbar";
import { PasswordInput } from "@/components/ui/password-input";
import { useLogin } from "@/services/api-sdk/models/user/user";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { FormattedMessage } from "@/components/intl/formatters";
import { useIntl } from "@/lib/intl/hooks";
export default function LoginForm() {
  const form = useLoginForm();
  const { mutateAsync } = useLogin();
  const intl = useIntl();
  const router = useRouter();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: () => {
          toast({
            description: intl.formatMessage({
              id: "auth.loginSuccess",
              defaultMessage: "Logged in successfully!",
            }),
            className: "bg-primary text-primary-foreground",
          });
          router.push(ModulesRoutes.modules);
        },
        onError: () => {
          toast({
            description: intl.formatMessage({
              id: "auth.invalidCredentials",
              defaultMessage: "Invalid credentials!",
            }),
            className: "bg-destructive text-destructive-foreground",
          });
        },
      });
    },
    [intl, mutateAsync, router],
  );
  return (
    <Form {...form}>
      <form
        className="container grid grid-cols-2 gap-5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                <FormattedMessage
                  id="auth.identifier"
                  defaultMessage="Identifier"
                />
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder={intl.formatMessage({
                      id: "auth.identifier",
                      defaultMessage: "Identifier",
                    })}
                    className="h-12 pl-10"
                  />
                  <User className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                <FormattedMessage
                  id="auth.password"
                  defaultMessage="Password"
                />
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <PasswordInput
                    {...field}
                    placeholder="********"
                    className="h-12 pl-10"
                  />
                  <Lock className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="col-span-2 gap-2 md:col-span-1 md:w-fit"
        >
          {form.formState.isSubmitting ? (
            <EllipsisLoader />
          ) : (
            <>
              <FormattedMessage
                id="auth.login"
                defaultMessage="Log in"
              />
              <LogIn />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
