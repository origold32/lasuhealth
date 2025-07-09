import { ReactNode } from "react";

import AuthContentContainer from "./_auth-content-container";

type Props = { children: ReactNode };

export default function AuthLayoutV1({ children }: Props) {
  return (
    <div className='min-h-screen bg-[url("/images/lasu-view.png")] bg-cover bg-center flex items-center justify-center relative'>
      <div className="absolute inset-0 bg-black/60 z-0" />
      <AuthContentContainer>
        <div className="bg-white space-y-4 p-6 rounded-md z-10">{children}</div>
      </AuthContentContainer>
    </div>
  );
}
