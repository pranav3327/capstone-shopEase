const Skeleton = ({ className, ...props }) => {
    return (
        <div
            className={`animate-pulse bg-white/5 rounded-md ${className}`}
            {...props}
        />
    );
};

export const ProductCardSkeleton = () => {
    return (
        <div className="card h-full flex flex-col">
            <div className="aspect-[3/4] w-full bg-white/5 rounded-t-xl animate-pulse" />
            <div className="p-4 space-y-3 flex-1">
                <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse" />
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                    <div className="h-5 bg-white/5 rounded w-1/3 animate-pulse" />
                    <div className="h-8 w-8 bg-white/5 rounded-full animate-pulse" />
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
