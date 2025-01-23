import logo from '../../assets/images/logo.png'
import profile from '../../assets//images/profile.png'
import { usePersianDateTime } from '../CurrentDate'
function Header(): JSX.Element {
  const { persianDate, persianTime } = usePersianDateTime()

  return (
    <>
      <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-100 via-white to-blue-100 ">
        <div
          className="flex items-center gap-3;
]"
        >
          <img src={logo} alt="" className="w-[72px] h-[72px] bg-cover" />
          <span className="text-[#011627] text-xl">بانک سپه</span>
        </div>

        <div className="flex items-center gap-x-4">
  <img src={profile} alt="" className="w-[64px] h-[64px] rounded-full" />
  <div className="flex flex-col space-y-4">
    <span>پوریا تاج بخش</span>
    <div className="flex items-center">
      <span className="min-w-[80px]">{persianTime}</span>
      <span>{persianDate}</span>
    </div>
  </div>
</div>

      </div>
    </>
  )
}

export default Header
