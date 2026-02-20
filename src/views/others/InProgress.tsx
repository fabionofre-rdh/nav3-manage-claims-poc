import { Container, AdaptiveCard } from "@/components/shared";

const InProgress = () => {
  return (
    <Container>
      <AdaptiveCard>
        <div className="h-full flex flex-col items-center justify-center min-h-[60vh]">
          <div className="mt-6 text-center">
            <h3 className="mb-2">Work In Progress!</h3>
            <p className="text-base">
              This page is currently under development. Please check back later.
            </p>
          </div>
        </div>
      </AdaptiveCard>
    </Container>
  );
};

export default InProgress;
