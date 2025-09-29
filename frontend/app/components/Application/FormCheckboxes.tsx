import {
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { CheckboxesChecked } from "./constants";

interface FormCheckboxesProps {
  checkboxesChecked: CheckboxesChecked;
  onCheckboxChange: (name: keyof CheckboxesChecked) => void;
  tuitionFee: number;
}

const FormCheckboxes = ({
  checkboxesChecked,
  onCheckboxChange,
  tuitionFee,
}: FormCheckboxesProps) => {
  return (
    <div className="mt-5 flex w-full flex-col gap-3">
      <List
        className="flex-col"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <ListItem
          className="p-0 hover:bg-transparent"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <label className="flex w-full cursor-pointer items-center py-2">
            <ListItemPrefix
              className="mr-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Checkbox
                ripple={false}
                containerProps={{ className: "p-0" }}
                onChange={() => onCheckboxChange("newsletter")}
                checked={checkboxesChecked.newsletter}
                required
                crossOrigin={undefined}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </ListItemPrefix>
            <Typography
              className="font-normal text-sm text-gray-600"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              I would like to be kept up to date with new training programs,
              events, promotions, and marketing.
            </Typography>
          </label>
        </ListItem>

        <ListItem
          className="p-0 hover:bg-transparent"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <label className="flex w-full cursor-pointer items-center py-2">
            <ListItemPrefix
              className="mr-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Checkbox
                ripple={false}
                containerProps={{ className: "p-0" }}
                onChange={() => onCheckboxChange("privacyPolicy")}
                checked={checkboxesChecked.privacyPolicy}
                required
                crossOrigin={undefined}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </ListItemPrefix>
            <Typography
              className="font-normal text-sm text-gray-600"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              By submitting this form, I accept DLT Africa's Privacy Policy.
            </Typography>
          </label>
        </ListItem>

        <ListItem
          className="p-0 hover:bg-transparent"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <label className="flex w-full cursor-pointer items-center py-2">
            <ListItemPrefix
              className="mr-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Checkbox
                ripple={false}
                containerProps={{ className: "p-0" }}
                onChange={() => onCheckboxChange("payment")}
                checked={checkboxesChecked.payment}
                required
                crossOrigin={undefined}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </ListItemPrefix>
            <Typography
              className="font-normal text-sm text-[#000]"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Are you sure you want to apply for this course at the specified
              fee of ₦{tuitionFee.toFixed(2)}?
            </Typography>
          </label>
        </ListItem>
      </List>
    </div>
  );
};

export default FormCheckboxes;
