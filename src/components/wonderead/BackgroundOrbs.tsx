const BackgroundOrbs = () => {
  return (
    <>
      <div className="fixed w-[500px] h-[500px] rounded-full bg-lavender opacity-[0.45] blur-[80px] -top-[120px] -right-[100px] pointer-events-none z-0" />
      <div className="fixed w-[380px] h-[380px] rounded-full bg-lavender-mid opacity-[0.25] blur-[60px] -bottom-[80px] -left-[80px] pointer-events-none z-0" />
      <div className="fixed w-[260px] h-[260px] rounded-full bg-lavender opacity-[0.35] blur-[50px] bottom-[200px] right-[60px] pointer-events-none z-0" />
    </>
  );
};

export default BackgroundOrbs;
