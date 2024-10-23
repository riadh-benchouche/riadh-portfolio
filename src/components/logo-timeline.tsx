import { clsx } from 'clsx'
import { Mark } from './logo'

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative">
      <div className="absolute inset-x-0 top-6 h-0.5 bg-gradient-to-r from-black/20 from-[2px] to-[2px] bg-[length:12px_100%]" />
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-black/5 from-[2px] to-[2px] bg-[length:12px_100%] group-last:hidden" />
      {children}
    </div>
  )
}

function Logo({
  label,
  src,
  className,
}: {
  label: string
  src: string
  className: string
}) {
  return (
    <div
      className={clsx(
        className,
        'absolute top-2 grid grid-cols-[1rem,1fr] items-center gap-2 whitespace-nowrap px-3 py-1',
        'rounded-full bg-gradient-to-t from-white to-gray-100 ring-1 ring-black/10',
        '[--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]',
      )}
    >
      <img alt="" src={src} className="size-4" />
      <span className="text-sm/6 font-medium text-black">{label}</span>
    </div>
  )
}

export function LogoTimeline() {
  return (
      <div aria-hidden="true" className="relative h-full overflow-hidden">
        <div className="absolute inset-0 top- z-10 flex items-center justify-center">
          <div
              className="absolute inset-0 backdrop-blur-md"
              style={{
                maskImage: `url('data:image/svg+xml,<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="96" height="96" rx="12" fill="black"/></svg>')`,
                maskPosition: 'center',
                maskRepeat: 'no-repeat',
              }}
          />
          <div
              className="relative flex size-24 items-center justify-center rounded-xl bg-gradient-to-t from-white/5 to-white/25 shadow outline outline-offset-[-5px] outline-white/5 ring-1 ring-inset ring-white/10">
            <Mark className="h-9 fill-black"/>
          </div>
        </div>
        <div className="absolute inset-0 grid grid-cols-1 pt-4 [container-type:inline-size]">
          <Row>
            <Logo
                label="Vue JS"
                src="/logo-timeline/vue.svg"
                className="[animation-delay:-26s] [animation-duration:30s]"
            />
            <Logo
                label="Laravel"
                src="/logo-timeline/laravel.svg"
                className="[animation-delay:-8s] [animation-duration:30s]"
            />
          </Row>
          <Row>
            <Logo
                label="Docker"
                src="/logo-timeline/docker.svg"
                className="[animation-delay:-40s] [animation-duration:40s]"
            />
            <Logo
                label="Github"
                src="/logo-timeline/github.svg"
                className="[animation-delay:-20s] [animation-duration:40s]"
            />
          </Row>
          <Row>
            <Logo
                label="Next JS"
                src="/logo-timeline/next.svg"
                className="[animation-delay:-10s] [animation-duration:40s]"
            />
            <Logo
                label="React JS"
                src="/logo-timeline/react.svg"
                className="[animation-delay:-32s] [animation-duration:40s]"
            />
          </Row>
          <Row>
            <Logo
                label="Node JS"
                src="/logo-timeline/node.svg"
                className="[animation-delay:-45s] [animation-duration:45s]"
            />
            <Logo
                label="Tailwind CSS"
                src="/logo-timeline/tailwind.svg"
                className="[animation-delay:-23s] [animation-duration:45s]"
            />
          </Row>
          <Row>
            <Logo
                label="Jest"
                src="/logo-timeline/jest.svg"
                className="[animation-delay:-55s] [animation-duration:60s]"
            />
            <Logo
                label="Pest"
                src="/logo-timeline/pest.svg"
                className="[animation-delay:-20s] [animation-duration:60s]"
            />
          </Row>
          <Row>
            <Logo
                label="Typescript"
                src="/logo-timeline/typescript.svg"
                className="[animation-delay:-9s] [animation-duration:40s]"
            />
            <Logo
                label="Slack"
                src="/logo-timeline/slack.svg"
                className="[animation-delay:-28s] [animation-duration:40s]"
            />
          </Row>
        </div>
      </div>
  )
}
