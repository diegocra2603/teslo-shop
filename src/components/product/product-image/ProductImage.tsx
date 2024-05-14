import Image from "next/image"


interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
    width: number;
    height: number;
    priority?: boolean
}

export const ProductImage = ({
    src,
    alt,
    className,
    width,
    height,
    priority,
    style
}: Props) => {

    const localSrc = (src)
        ? src.startsWith('http')
            ? src
            : `/products/${src}`
        : '/imgs/placeholder.jpg';

    return (
        <Image
            src={localSrc}
            width={width}
            height={height}
            alt={alt}
            className={className}
            priority={priority ?? false}
            style={style}
        />
    )
}
