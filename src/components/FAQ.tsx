import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <section className="py-16 bg-[#0A0F1E]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-[#1A1F2C] rounded-lg border-none px-6">
              <AccordionTrigger className="text-white hover:no-underline">
                How accurate is the thread generation?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                While our AI-powered system strives for accuracy, it's important to note that transcription and thread generation may not be 100% perfect every time. We recommend reviewing and editing the generated content before posting to ensure it meets your standards.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-[#1A1F2C] rounded-lg border-none px-6">
              <AccordionTrigger className="text-white hover:no-underline">
                How many threads can I generate?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                Free users get 5 thread generations per month. Pro users get unlimited thread generations along with additional features and priority support.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-[#1A1F2C] rounded-lg border-none px-6">
              <AccordionTrigger className="text-white hover:no-underline">
                What types of videos work best?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                Our system works best with clear, well-structured content like tutorials, educational videos, and talks. Videos with good audio quality and clear speech will yield the best results.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-[#1A1F2C] rounded-lg border-none px-6">
              <AccordionTrigger className="text-white hover:no-underline">
                Can I edit the generated threads?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                Yes! You can edit and customize any generated thread before posting it. We encourage reviewing and personalizing the content to match your voice and style.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-[#1A1F2C] rounded-lg border-none px-6">
              <AccordionTrigger className="text-white hover:no-underline">
                What video platforms are supported?
              </AccordionTrigger>
              <AccordionContent className="text-slate-300">
                Currently, we support YouTube videos. We're working on adding support for more platforms in the future.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};