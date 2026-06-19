import svgPaths from "./svg-ilittq6k53";
import imgInvisible from "./f10af580fc731a1d79291211fe4aeb317c711711.png";

function Email() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Email">
      <div aria-hidden className="absolute border border-[#acacac] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[14px] relative size-full">
          <p className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#acacac] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 9' }}>
            Enter your email
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9px] items-start left-[32px] top-[242px] w-[327px]">
      <p className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#f1f1f1] text-[14px] w-full" style={{ fontVariationSettings: '"opsz" 9' }}>
        E-mail
      </p>
      <Email />
    </div>
  );
}

function Password() {
  return (
    <div className="absolute content-stretch flex gap-[143px] h-[46px] items-center justify-center left-[32px] px-[16px] py-[11px] rounded-[4px] top-[366px] w-[327px]" data-name="Password">
      <div aria-hidden className="absolute border border-[#acacac] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#acacac] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 9' }}>
        Enter your password
      </p>
      <div className="relative shrink-0 size-[18px]" data-name="Invisible">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgInvisible} />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[38px] top-[428px]">
      <div className="relative rounded-[2px] shrink-0 size-[10px]">
        <div aria-hidden className="absolute border border-[#acacac] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#acacac] text-[14px] whitespace-nowrap">Remember Me</p>
    </div>
  );
}

function Button() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#92e3a9] content-stretch flex h-[48px] items-center justify-center left-1/2 px-[24px] py-[12px] rounded-[100px] top-[493px] w-[327px]" data-name="Button">
      <p className="[word-break:break-word] font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#263238] text-[14px] text-center whitespace-nowrap">Sign in</p>
    </div>
  );
}

function Google() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Google">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Google">
          <path d={svgPaths.p8f345c0} fill="var(--fill-0, #92E3A9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[12px] h-[48px] items-center justify-center left-1/2 px-[24px] py-[12px] rounded-[100px] top-[630px] w-[327px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#92e3a9] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <Google />
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#92e3a9] text-[14px] text-center whitespace-nowrap">Log in with Google</p>
    </div>
  );
}

function Facebook() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="facebook">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="facebook">
          <path d={svgPaths.p38d6cc30} fill="var(--fill-0, #92E3A9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[12px] h-[48px] items-center justify-center left-1/2 px-[24px] py-[12px] rounded-[100px] top-[700px] w-[327px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#92e3a9] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <Facebook />
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#92e3a9] text-[14px] text-center whitespace-nowrap">Log in with Facebook</p>
    </div>
  );
}

function Divider() {
  return (
    <div className="absolute h-[17px] left-[39px] top-[577px] w-[315px]" data-name="divider">
      <div className="absolute h-0 left-0 top-[9px] w-[130px]">
        <div className="absolute inset-[-1px_-0.77%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 132 2">
            <path d="M1 1H131" id="Vector 2" stroke="var(--stroke-0, #ACACAC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Outfit:Regular',sans-serif] font-normal leading-[normal] left-[157px] text-[#f1f1f1] text-[14px] text-center top-0 whitespace-nowrap">or</p>
      <div className="absolute h-0 left-[185px] top-[9px] w-[130px]">
        <div className="absolute inset-[-1px_-0.77%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 132 2">
            <path d="M1 1H131" id="Vector 3" stroke="var(--stroke-0, #ACACAC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ArrowNarrowLeft() {
  return (
    <div className="absolute left-[32px] size-[26px] top-[85px]" data-name="ArrowNarrowLeft">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g id="ArrowNarrowLeft">
          <path clipRule="evenodd" d={svgPaths.pcf5b0f0} fill="var(--fill-0, #F1F1F1)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function SignIn() {
  return (
    <div className="bg-[#263238] relative size-full" data-name="Sign in">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] left-1/2 text-[#f1f1f1] text-[24px] text-center top-[156px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Welcome back, Hero!
      </p>
      <Frame />
      <Password />
      <p className="[word-break:break-word] absolute font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[normal] left-[32px] text-[#f1f1f1] text-[14px] top-[339px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 9' }}>
        Password
      </p>
      <Frame1 />
      <p className="[word-break:break-word] absolute font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[normal] left-[246px] text-[#92e3a9] text-[14px] top-[428px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 9' }}>
        Forgot Password?
      </p>
      <Button />
      <Button1 />
      <Button2 />
      <Divider />
      <p className="[word-break:break-word] absolute font-['Big_Shoulders_Display:Black',sans-serif] font-black leading-[0] left-[calc(50%-51.5px)] text-[#f1f1f1] text-[36px] top-[77px] whitespace-nowrap">
        <span className="leading-[normal]">Fin</span>
        <span className="font-['Big_Shoulders_Stencil_Display:Black',sans-serif] leading-[normal] text-[#92e3a9]">M</span>
        <span className="leading-[normal]">an</span>
      </p>
      <ArrowNarrowLeft />
    </div>
  );
}