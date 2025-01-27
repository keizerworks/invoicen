import Image from "next/image";
import { auth } from "~/actions/auth";
import { login } from "~/actions/auth/login";
import { logout } from "~/actions/auth/logout";
import { Button } from "~/components/ui/button";

export default async function Home() {
  const subject = await auth();
  console.log(subject);

  return (
    <div>
      <main>
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          {subject ? (
            <>
              <li>
                Logged in as <code>{subject.properties.id}</code>.
              </li>
              <li>
                And then check out <code>app/page.tsx</code>.
              </li>
            </>
          ) : (
            <>
              <li>Login with your email and password.</li>
              <li>
                And then check out <code>app/page.tsx</code>.
              </li>
            </>
          )}
        </ol>

        <div>
          {subject ? (
            <form action={logout}>
              <Button>Logout</Button>
            </form>
          ) : (
            <form action={login}>
              <Button>Login with OpenAuth</Button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
