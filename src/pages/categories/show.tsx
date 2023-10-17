import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
  BooleanField,
  MarkdownField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {translate("categories.fields.id")}
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          {translate("categories.fields.title")}
        </Typography>
        <TextField value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          {translate("isActive")}
        </Typography>
        <BooleanField value={record?.isActive} />
        <Typography variant="body1" fontWeight="bold">
          {translate("Cover")}
        </Typography>
        <img
          src={record?.cover}
          alt={record?.title}
          style={{ width: "300px", aspectRatio: "3/2", borderRadius: "5px" }}
          loading="lazy"
        />
      </Stack>
    </Show>
  );
};
