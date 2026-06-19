import imgSuperheroBro1 from "./6fc8b2e580987ff1a5080491a181aa0e965b6975.png";

function Button() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#92e3a9] content-stretch flex h-[48px] items-center justify-center left-1/2 px-[48px] py-[20px] rounded-[100px] top-[681px] w-[327px]" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Outfit:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#263238] text-[14px] whitespace-nowrap">
        <p className="leading-[16px]">Sign in</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex h-[48px] items-center justify-center left-1/2 px-[48px] py-[20px] rounded-[100px] top-[751px] w-[327px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#92e3a9] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="[word-break:break-word] flex flex-col font-['Outfit:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#92e3a9] text-[14px] whitespace-nowrap">
        <p className="leading-[16px]">I’m new, sign me up!</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[24px] items-start justify-center left-[33px] top-[510px] w-[327px]" data-name="Content">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#92e3a9] text-[20px] w-full">Unleash Your Financial Superpower!</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#f1f1f1] text-[16px] w-full">Welcome to FinMan! your personal finance superhero. Manage your money effortlessly, and let our AI-powered sidekick guide you every step of the way.</p>
    </div>
  );
}

export default function Onboaring() {
  return (
    <div className="bg-[#263238] relative size-full" data-name="Onboaring">
      <Button />
      <Button1 />
      <Content />
      <div className="absolute left-0 size-[393px] top-[117px]" data-name="Superhero-bro 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSuperheroBro1} />
      </div>
      <p className="[word-break:break-word] absolute font-['Big_Shoulders_Display:Black',sans-serif] font-black leading-[0] left-[145px] text-[#f1f1f1] text-[36px] top-[77px] whitespace-nowrap">
        <span className="leading-[normal]">Fin</span>
        <span className="font-['Big_Shoulders_Stencil_Display:Black',sans-serif] leading-[normal] text-[#92e3a9]">M</span>
        <span className="leading-[normal]">an</span>
      </p>
    </div>
  );
}