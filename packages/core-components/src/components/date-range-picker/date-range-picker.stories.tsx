import { userEvent } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getArgTypes } from '../../docs/config/utils';

function toHtmlAttribute(args: Record<string, unknown>, key: string): string {
  const value = args[key];
  if (value == null || value === '') {
    return '';
  }

  return `${key}=${JSON.stringify(value)}`;
}

const controls = {
  dateRange: false,
  presets: false,
  disableDates: 'function',
  hint: 'text',
  error: 'text',
};

const meta: Meta = {
  title: 'Components/Form/Date Range Picker',
  component: 'b2b-date-range-picker',
  args: {
    label: 'Zeitraum auswählen',
    required: false,
    dateRange: undefined,
    disableDates: undefined,
    presets: {},
    invalid: false,
    hint: undefined,
    error: undefined,
    language: 'de',
  },
  argTypes: {
    ...getArgTypes('b2b-date-range-picker', controls),
  },
  render: ({ ...args }) => `<div style="margin-left: 2px; width: 300px">
      <b2b-date-range-picker
        ${toHtmlAttribute(args, 'label')}
        ${toHtmlAttribute(args, 'required')}
        ${toHtmlAttribute(args, 'dateRange')}
        ${toHtmlAttribute(args, 'disableDates')}
        ${toHtmlAttribute(args, 'presets')}
        ${toHtmlAttribute(args, 'invalid')}
        ${toHtmlAttribute(args, 'hint')}
        ${toHtmlAttribute(args, 'error')}
        ${toHtmlAttribute(args, 'language')} >
      </b2b-date-range-picker>
    </div>`,
};

export default meta;

export const Default: Story = {
  args: { ...meta.args },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-range-picker');
      const focusWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-focus-wrapper',
      );
      await userEvent.click(focusWrapper);
    }, 500);
  },
};

export const AllProperties: Story = {
  args: {
    ...meta.args,
    label: 'Custom Label',
    required: true,
    invalid: true,
    hint: 'Please Readme',
    error: 'Sorry, but this is a test',
  },
  play: async ({ canvasElement }) => {
    setTimeout(async () => {
      const datePicker = canvasElement.querySelector('b2b-date-range-picker');
      datePicker.dateRange = [new Date(2025, 0, 1), new Date()];
      datePicker.disableDates = date => date.getDay() == 1;
      datePicker.presets = {
        'Today': [new Date(), new Date()],
        'Feature Added': [new Date(2025, 8, 23), new Date(2025, 8, 23)],
      };

      const focusWrapper = datePicker.shadowRoot?.querySelector(
        '.b2b-date-picker-input-focus-wrapper',
      );
      await userEvent.click(focusWrapper);
    }, 500);
  },
};
