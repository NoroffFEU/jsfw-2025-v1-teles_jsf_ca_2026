import { createFileRoute } from "@tanstack/react-router";
import { brandSettings, accessibilityTexts } from "@/lib/data/index";

export const Route = createFileRoute("/about/accessibility")({
  component: AccessibilityCommitment,
});

function AccessibilityCommitment() {
  return (
    <div className="grid gap-6 max-w-250 pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center">
      <h1 className="w-fit p-1 rounded-sm text-3xl mt-4 mb-2 font-mono bg-selection">
        Accessibility Commitment
      </h1>

      <p>
        <strong>Our commitment.</strong> {accessibilityTexts.intro}
      </p>

      <h2 className="font-semibold">Standards and scope</h2>
      <p>{accessibilityTexts.standardsScope}</p>

      <h2 className="font-semibold">Known limitations</h2>
      <p>{accessibilityTexts.knownLimitations}</p>
      <ul className="list-disc pl-6 grid gap-2">
        <li>{accessibilityTexts.limitationExamples.captions}</li>
        <li>{accessibilityTexts.limitationExamples.formControls}</li>
        <li>{accessibilityTexts.limitationExamples.keyboardSupport}</li>
      </ul>

      <h2 className="font-semibold">What we have done</h2>
      <p>{accessibilityTexts.whatWeHaveDone}</p>

      <h2 className="font-semibold">How to request help or report a problem</h2>
      <p>{accessibilityTexts.reportProblem}</p>
      <p>
        <strong>Email:</strong> {brandSettings.email}
      </p>
      <p>
        <strong>Phone:</strong> {brandSettings.phone}, (
        {brandSettings.phoneHours})
      </p>
      <p>
        <strong>Postal:</strong> {brandSettings.name}, {brandSettings.address},{" "}
        {brandSettings.city}, {brandSettings.country}
      </p>
      <p>{accessibilityTexts.responseTimes}</p>

      <h2 className="font-semibold">
        Alternative formats and reasonable adjustments
      </h2>
      <p>{accessibilityTexts.alternativeFormats}</p>

      <h2 className="font-semibold">Continuous improvement</h2>
      <p>{accessibilityTexts.continuousImprovement}</p>
    </div>
  );
}
