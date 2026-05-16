import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { termsTexts } from "@/lib/data/index";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select/select";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Terms and condition page for ShopNet online shop",
      },
      {
        title: "Terms & Conditions - ShopNet",
      },
    ],
  }),
  component: Terms,
});

function Terms() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-6 max-w-250 pt-10 pl-10 pr-10 md:pl-20 md:pr-20 justify-self-center">
      <h1 className="w-fit p-1 rounded-sm text-3xl mt-4 mb-2 font-mono bg-selection">
        Terms and Conditions for ShopNet
      </h1>

      <p className="text-sm">Last updated: April 25, 2026</p>

      <p>
        <strong>Welcome to ShopNet.</strong> {termsTexts.intro}
      </p>

      <Select
        onValueChange={(id) => {
          navigate({
            to: `#${id}`,
          });
        }}
      >
        <SelectTrigger aria-label="Sort products" className="w-45">
          <SelectValue placeholder="Table of Contents" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Terms and Conditions</SelectLabel>
            <SelectItem value="1" id="1">
              1. Scope and acceptance
            </SelectItem>
            <SelectItem value="2" id="2">
              2. Consumer status and eligibility
            </SelectItem>
            <SelectItem value="3" id="3">
              3. Products and product information
            </SelectItem>
            <SelectItem value="4" id="4">
              4. Orders and contract formation
            </SelectItem>
            <SelectItem value="5" id="5">
              5. Prices and payment
            </SelectItem>
            <SelectItem value="6" id="6">
              6. Delivery
            </SelectItem>
            <SelectItem value="7" id="7">
              7. Right of withdrawal
            </SelectItem>
            <SelectItem value="8" id="8">
              8. Returns and refunds
            </SelectItem>
            <SelectItem value="9" id="9">
              9. Inspection of goods
            </SelectItem>
            <SelectItem value="10" id="10">
              10. Defective goods and complaints
            </SelectItem>
            <SelectItem value="11" id="11">
              11. User accounts
            </SelectItem>
            <SelectItem value="12" id="12">
              12. Intellectual property rights
            </SelectItem>
            <SelectItem value="13" id="13">
              13. Limitation of liability
            </SelectItem>
            <SelectItem value="14" id="14">
              14. Privacy and cookies
            </SelectItem>
            <SelectItem value="15" id="15">
              15. Governing law and disputes
            </SelectItem>
            <SelectItem value="16" id="16">
              16. Contact information
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <h2 className="font-semibold" id="1">
        1. Scope and acceptance
      </h2>
      <p>{termsTexts.scope}</p>

      <h2 className="font-semibold" id="2">
        2. Consumer status and eligibility
      </h2>
      <p>{termsTexts.eligibility}</p>

      <h2 className="font-semibold" id="3">
        3. Products and product information
      </h2>
      <p>{termsTexts.products}</p>

      <h2 className="font-semibold" id="4">
        4. Orders and contract formation
      </h2>
      <p>{termsTexts.orders}</p>

      <h2 className="font-semibold" id="5">
        5. Prices and payment
      </h2>
      <p>{termsTexts.payment}</p>

      <h2 className="font-semibold" id="6">
        6. Delivery
      </h2>
      <p>{termsTexts.delivery}</p>

      <h2 className="font-semibold" id="7">
        7. Right of withdrawal
      </h2>
      <p>{termsTexts.withdrawal}</p>

      <h2 className="font-semibold" id="8">
        8. Return costs and refunds
      </h2>
      <p>{termsTexts.refunds}</p>

      <h2 className="font-semibold" id="9">
        9. Inspection of goods
      </h2>
      <p>{termsTexts.inspection}</p>

      <h2 className="font-semibold" id="10">
        10. Defective goods and complaints
      </h2>
      <p>{termsTexts.complaints}</p>

      <h2 className="font-semibold" id="11">
        11. User accounts
      </h2>
      <p>{termsTexts.accounts}</p>

      <h2 className="font-semibold" id="12">
        12. Intellectual property
      </h2>
      <p>{termsTexts.property}</p>

      <h2 className="font-semibold" id="13">
        13. Limitation of liability
      </h2>
      <p>{termsTexts.liability}</p>

      <h2 className="font-semibold" id="14">
        14. Privacy and cookies
      </h2>
      <p>{termsTexts.privacy}</p>

      <h2 className="font-semibold" id="15">
        15. Governing law and disputes
      </h2>
      <p>{termsTexts.disputes}</p>

      <h2 className="font-semibold" id="16">
        16. Contact information
      </h2>
      <p>{termsTexts.contact}</p>
    </div>
  );
}
