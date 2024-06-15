import { ReactNode } from "react";
import Form from "@/components/form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { editUser, getUserNameAndMail } from "@/lib/actions";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const user = await getUserNameAndMail(session.user.id);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Ayarlar
        </h1>
        <Form
          title="İsim"
          description="Adını soyadınızı giriniz."
          helpText="Maksimum 32 karakter kullanabilirsiniz."
          inputAttrs={{
            name: "name",
            type: "text",
            defaultValue: user?.name!,
            placeholder: "Kadir Balçın",
            maxLength: 32,
          }}
          handleSubmit={editUser}
        />
        <Form
          title="E-Posta"
          description="Lütfen e-posta adresinizi giriniz."
          helpText="Lütfen geçerli bir adres giriniz."
          inputAttrs={{
            name: "email",
            type: "email",
            defaultValue: user?.email!,
            placeholder: "info@retodi.com",
          }}
          handleSubmit={editUser}
        />
      </div>
    </div>
  );
}
