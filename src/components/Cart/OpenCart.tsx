import { Button } from '@/components/ui/button'

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string
  quantity?: number
}) {
  return (
    <Button
      variant="nav_normalcase"
      size="clear"
      className="navLink relative items-end hover:cursor-pointer font-anek-bangla"
      {...rest}
    >
      <span>SEPETİM</span>

      {quantity ? (
        <>
          <span>•</span>
          <span>{quantity}</span>
        </>
      ) : null}
    </Button>
  )
}
