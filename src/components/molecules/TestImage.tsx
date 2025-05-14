import Image from "next/image";

export const TestImage = () => {
  return (
    <div className="relative w-full h-96">
      <Image
        src="/optimized/nighttimecontrast.webp"
        alt="Test image"
        fill
        className="object-cover"
      />
      <div className="relative z-10 p-4 bg-white bg-opacity-70">
        <h2>Test Image Loading</h2>
      </div>
    </div>
  );
};

export default TestImage;
