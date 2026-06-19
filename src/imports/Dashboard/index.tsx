import svgPaths from "./svg-ihwslw7wlq";
import imgRectangle from "./1af2086220affecd5f498aeca93f64918a91bf86.png";

function Frame() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <div className="relative rounded-[64px] shadow-[0px_0px_4px_1px_#92e3a9] shrink-0 size-[40px]" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[64px] size-full" src={imgRectangle} />
      </div>
      <p className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#f1f1f1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Anthony Jakubowski
      </p>
    </div>
  );
}

function BellOutline() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="BellOutline">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="BellOutline">
          <path d={svgPaths.p353d9364} id="Vector" stroke="var(--stroke-0, #F1F1F1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[32px] top-[72px] w-[328px]" data-name="Header">
      <Frame />
      <BellOutline />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[0] min-w-full relative shrink-0 text-[#f1f1f1] text-[0px] w-[min-content]" style={{ fontVariationSettings: '"opsz" 14' }}>
        <span className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] text-[18px]" style={{ fontVariationSettings: '"opsz" 14' }}>
          You’re
        </span>
        <span className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] text-[18px]" style={{ fontVariationSettings: '"opsz" 14' }}>{` a `}</span>
        <span className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] text-[18px]" style={{ fontVariationSettings: '"opsz" 14' }}>
          Superhero!
        </span>
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#acacac] text-[12px] w-[141px]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Your expenses reduced by 15% from last month
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[26px] items-start relative shrink-0 w-[175px]">
      <Frame1 />
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#92e3a9] text-[12px] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        View Details
      </p>
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="col-1 ml-0 mt-0 relative row-1 size-[100px]" data-name="Progress Bar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g id="Progress Bar">
          <path d={svgPaths.p1c653a70} fill="var(--fill-0, #3C5C45)" id="Ellipse 2" />
          <path d={svgPaths.p4a29e00} fill="var(--fill-0, #92E3A9)" id="Ellipse 3" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <ProgressBar />
      <p className="[word-break:break-word] col-1 font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] ml-[26px] mt-[32px] relative row-1 text-[#f1f1f1] text-[18px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        $85,2
      </p>
      <p className="[word-break:break-word] col-1 font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] ml-[36px] mt-[55px] relative row-1 text-[#f1f1f1] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Saved
      </p>
    </div>
  );
}

function HeroCard() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#33434b] content-stretch flex gap-[19px] items-start left-1/2 overflow-clip px-[17px] py-[19px] rounded-[12px] top-[280px] w-[329px]" data-name="Hero Card">
      <Frame2 />
      <Group />
    </div>
  );
}

function DateDivider() {
  return (
    <div className="absolute content-stretch flex gap-[7px] items-center left-[20px] top-[305px]" data-name="Date Divider">
      <p className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#acacac] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        24 February 2025
      </p>
      <div className="h-0 relative shrink-0 w-[196px]">
        <div className="absolute inset-[-0.5px_-0.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 197 1">
            <path d="M0.5 0.5H196.5" id="Vector 6" stroke="var(--stroke-0, #ACACAC)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ShoppingCartOutline() {
  return (
    <div className="absolute left-[7px] size-[20px] top-[6px]" data-name="ShoppingCartOutline">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ShoppingCartOutline">
          <path d={svgPaths.p2f034df0} id="Vector" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="bg-[#f1f1f1] relative rounded-[100px] shrink-0 size-[32px]" data-name="Icon">
      <ShoppingCartOutline />
    </div>
  );
}

function TransactionName() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[55px]" data-name="Transaction Name">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#f1f1f1] text-[12px] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        Shopping
      </p>
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium relative shrink-0 text-[#acacac] text-[10px] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        Grocery
      </p>
    </div>
  );
}

function Items() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Items">
      <Icon />
      <TransactionName />
    </div>
  );
}

function TransactionItem1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Transaction Item">
      <Items />
      <p className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#f1f1f1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        -$320
      </p>
    </div>
  );
}

function TransactionItemDivided() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Transaction Item - Divided">
      <TransactionItem1 />
      <div className="h-0 relative shrink-0 w-[288px]">
        <div className="absolute inset-[-0.1px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 288.2 0.2">
            <path d="M0.1 0.1H288.1" id="Vector 5" stroke="var(--stroke-0, #ACACAC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconRestaurant() {
  return (
    <div className="absolute bottom-1/4 left-1/4 right-[24.68%] top-1/4" data-name="🦆 icon 'restaurant'">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.1021 16">
        <g id="ð¦ icon 'restaurant'">
          <path d={svgPaths.p2bce4d00} fill="var(--fill-0, #263238)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="bg-[#f1f1f1] relative rounded-[100px] shrink-0 size-[32px]" data-name="Icon">
      <IconRestaurant />
    </div>
  );
}

function TransactionName1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[55px]" data-name="Transaction Name">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold min-w-full relative shrink-0 text-[#f1f1f1] text-[12px] w-[min-content]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Food
      </p>
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium relative shrink-0 text-[#acacac] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Fried Chicken
      </p>
    </div>
  );
}

function Items1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Items">
      <Icon1 />
      <TransactionName1 />
    </div>
  );
}

function TransactionItem2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Transaction Item">
      <Items1 />
      <p className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#f1f1f1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        -$68
      </p>
    </div>
  );
}

function TransactionItemDivided1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Transaction Item - Divided">
      <TransactionItem2 />
      <div className="h-0 relative shrink-0 w-[288px]">
        <div className="absolute inset-[-0.1px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 288.2 0.2">
            <path d="M0.1 0.1H288.1" id="Vector 5" stroke="var(--stroke-0, #ACACAC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconCoffeeCup() {
  return (
    <div className="absolute inset-1/4" data-name="🦆 icon 'coffee cup'">
      <div className="absolute inset-[-4.69%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
          <g id="ð¦ icon 'coffee cup'">
            <path d={svgPaths.p1ee470f0} id="Vector" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p3706bd80} id="Vector_2" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p258d180} id="Vector_3" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p88c900} id="Vector_4" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="bg-[#f1f1f1] relative rounded-[100px] shrink-0 size-[32px]" data-name="Icon">
      <IconCoffeeCup />
    </div>
  );
}

function TransactionName2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[55px]" data-name="Transaction Name">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold min-w-full relative shrink-0 text-[#f1f1f1] text-[12px] w-[min-content]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Drink
      </p>
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium relative shrink-0 text-[#acacac] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Coffee
      </p>
    </div>
  );
}

function Items2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Items">
      <Icon2 />
      <TransactionName2 />
    </div>
  );
}

function TransactionItem3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Transaction Item">
      <Items2 />
      <p className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#f1f1f1] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        -$10
      </p>
    </div>
  );
}

function TransactionItemDivided2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Transaction Item - Divided">
      <TransactionItem3 />
      <div className="h-0 relative shrink-0 w-[288px]">
        <div className="absolute inset-[-0.1px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 288.2 0.2">
            <path d="M0.1 0.1H288.1" id="Vector 5" stroke="var(--stroke-0, #ACACAC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TransactionItem() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-start left-[20px] top-[139px] w-[288px]" data-name="Transaction Item">
      <TransactionItemDivided />
      <TransactionItemDivided1 />
      <TransactionItemDivided2 />
    </div>
  );
}

function DateDivider1() {
  return (
    <div className="absolute content-stretch flex gap-[7px] items-center left-[20px] top-[106px]" data-name="Date Divider">
      <p className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#acacac] text-[10px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        26 February 2025
      </p>
      <div className="h-0 relative shrink-0 w-[196px]">
        <div className="absolute inset-[-0.5px_-0.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 197 1">
            <path d="M0.5 0.5H196.5" id="Vector 6" stroke="var(--stroke-0, #ACACAC)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Active() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0 w-[76px]" data-name="Active">
      <p className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#92e3a9] text-[14px] text-center w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        All
      </p>
      <div className="h-0 relative shrink-0 w-full" data-name="active line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 1">
            <line id="active line" stroke="var(--stroke-0, #92E3A9)" x2="76" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Tab() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[40px] items-start left-1/2 top-[65px] w-[288px]" data-name="Tab">
      <Active />
      <p className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#acacac] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Expenses
      </p>
      <p className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#acacac] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Income
      </p>
    </div>
  );
}

function Header1() {
  return (
    <div className="-translate-x-1/2 [word-break:break-word] absolute content-stretch flex items-end justify-between leading-[normal] left-1/2 text-[#f1f1f1] top-[19px] w-[288px] whitespace-nowrap" data-name="Header">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[12px]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Transaction History
      </p>
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[10px]" style={{ fontVariationSettings: '"opsz" 14' }}>
        view all
      </p>
    </div>
  );
}

function HistoryCard() {
  return (
    <div className="absolute bg-[#33434b] h-[415px] left-[33px] overflow-clip rounded-[12px] top-[437px] w-[328px]" data-name="History Card">
      <DateDivider />
      <TransactionItem />
      <DateDivider1 />
      <Tab />
      <Header1 />
    </div>
  );
}

function IconHomeHouse() {
  return (
    <div className="relative shrink-0 size-[20.98px]" data-name="🦆 icon 'home house'">
      <div className="absolute inset-[-4.77%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.9797 22.9797">
          <g id="ð¦ icon 'home house'">
            <path d={svgPaths.p1b47ca00} fill="var(--fill-0, #92E3A9)" id="Vector" stroke="var(--stroke-1, #92E3A9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-[31.02px]" data-name="Home">
      <IconHomeHouse />
      <p className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[#92e3a9] text-[10px] text-center w-[min-content]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Home
      </p>
    </div>
  );
}

function IconPieChart() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.005px]" data-name="🦆 icon 'pie chart'">
      <div className="absolute inset-[-5.8%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.324 22.319">
          <g id="ð¦ icon 'pie chart'">
            <path d={svgPaths.p16ae1180} id="Vector" stroke="var(--stroke-0, #ACACAC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.31895" />
            <path d={svgPaths.p3f56d900} id="Vector_2" stroke="var(--stroke-0, #ACACAC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.31895" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Charts() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-center relative shrink-0 w-[32px]" data-name="Charts">
      <IconPieChart />
      <p className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[#acacac] text-[10px] text-center w-[min-content]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Charts
      </p>
    </div>
  );
}

function NavButtonLeft() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[99.02px]" data-name="Nav Button Left">
      <Home />
      <Charts />
    </div>
  );
}

function IconAlternateComment() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="🦆 icon 'Alternate Comment'">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="ð¦ icon 'Alternate Comment'">
          <path d={svgPaths.p78bff70} fill="var(--fill-0, #ACACAC)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function AiChat() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-[35px]" data-name="AI Chat">
      <IconAlternateComment />
      <p className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[#acacac] text-[10px] text-center w-[min-content]" style={{ fontVariationSettings: '"opsz" 14' }}>
        AI Chat
      </p>
    </div>
  );
}

function UserOutline() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="UserOutline">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="UserOutline">
          <path d={svgPaths.p26cd8f2} id="Vector" stroke="var(--stroke-0, #ACACAC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Me() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-[24px]" data-name="Me">
      <UserOutline />
      <p className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[#acacac] text-[10px] text-center w-[min-content]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Me
      </p>
    </div>
  );
}

function NavButtonRight() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-[95px]" data-name="Nav Button Right">
      <AiChat />
      <Me />
    </div>
  );
}

function NavButton() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-end justify-between left-[calc(50%+0.5px)] top-[14px] w-[326px]" data-name="Nav Button">
      <NavButtonLeft />
      <NavButtonRight />
    </div>
  );
}

function Navbar() {
  return (
    <div className="absolute bg-[#33434b] h-[78px] left-0 overflow-clip shadow-[0px_-1px_4px_0px_rgba(0,0,0,0.25)] top-[774px] w-[393px]" data-name="Navbar">
      <NavButton />
    </div>
  );
}

function TransactionButton() {
  return (
    <div className="absolute left-[167px] size-[60px] top-[764px]" data-name="Transaction Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="Transaction Button">
          <circle cx="30" cy="30" fill="var(--fill-0, #92E3A9)" id="Ellipse 1" r="30" />
          <g id="PlusOutline">
            <path d={svgPaths.p1604e800} id="Vector" stroke="var(--stroke-0, #263238)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Balance() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex flex-col items-start leading-[normal] left-[33px] text-[24px] top-[137px] w-[168px]" data-name="Balance">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold mb-[-4px] relative shrink-0 text-[#f1f1f1] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        Balance
      </p>
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium relative shrink-0 text-[#92e3a9] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        $5.603,75
      </p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="ChevronDown">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ChevronDown">
          <path clipRule="evenodd" d={svgPaths.p92ee080} fill="var(--fill-0, #F1F1F1)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function DropdownCalendar() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Dropdown Calendar">
      <p className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#f1f1f1] text-[20px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Feb
      </p>
      <ChevronDown />
    </div>
  );
}

function Date() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[62px]" data-name="Date">
      <p className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#acacac] text-[14px] w-full" style={{ fontVariationSettings: '"opsz" 14' }}>
        2025
      </p>
      <DropdownCalendar />
    </div>
  );
}

function Expenses() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium items-start justify-center leading-[normal] relative shrink-0 whitespace-nowrap" data-name="Expenses">
      <p className="relative shrink-0 text-[#acacac] text-[14px]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Expenses
      </p>
      <p className="relative shrink-0 text-[#f1f1f1] text-[20px] text-center" style={{ fontVariationSettings: '"opsz" 14' }}>
        $568
      </p>
    </div>
  );
}

function Income() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium items-start justify-center leading-[normal] relative shrink-0 whitespace-nowrap" data-name="Income">
      <p className="relative shrink-0 text-[#acacac] text-[14px]" style={{ fontVariationSettings: '"opsz" 14' }}>
        Income
      </p>
      <p className="relative shrink-0 text-[#f1f1f1] text-[20px] text-center" style={{ fontVariationSettings: '"opsz" 14' }}>
        $1.200
      </p>
    </div>
  );
}

function Info() {
  return (
    <div className="absolute content-stretch flex gap-[32px] h-[44px] items-center left-[33px] top-[211px] w-[323px]" data-name="Info">
      <Date />
      <Expenses />
      <Income />
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-[#263238] relative size-full" data-name="Dashboard">
      <Header />
      <HeroCard />
      <HistoryCard />
      <Navbar />
      <TransactionButton />
      <Balance />
      <Info />
    </div>
  );
}