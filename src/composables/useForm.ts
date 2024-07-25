import { ref } from "vue";
import TextInput from "../components/inputs/TextInput.vue";
import CheckboxInput from "../components/inputs/CheckboxInput.vue";
import DateInput from "../components/inputs/DateInput.vue";
import { Section, Field, FieldErrors } from "../types/index.ts";

export default function useForm() {
  const sections = ref<Section[]>([
    {
      name: "Section 1",
      fields: [
        { type: "text", label: "Name", value: "" },
        { type: "email", label: "Email", value: "" },
        { type: "number", label: "Age", value: 0 },
      ],
    },
  ]);

  const errors = ref<FieldErrors[]>([{ fields: [] }]);

  const globalField = ref<{
    type: "text" | "email" | "number" | "date" | "checkbox";
    label: string;
  }>({
    type: "text",
    label: "",
  });
  const showModal = ref(false);
  const currentSectionIndex = ref<number | null>(null);
  const modalField = ref<{
    type: "text" | "email" | "number" | "date" | "checkbox";
    label: string;
  }>({
    type: "text",
    label: "",
  });

  const addSection = () => {
    const newSectionName = `Section ${sections.value.length + 1}`;
    sections.value.push({
      name: newSectionName,
      fields: [
        { type: "text", label: "Name", value: "" },
        { type: "email", label: "Email", value: "" },
      ],
    });
    errors.value.push({ fields: [] });
  };

  const removeSection = (index: number) => {
    sections.value.splice(index, 1);
    errors.value.splice(index, 1);
  };

  const moveSection = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < sections.value.length) {
      const [movedSection] = sections.value.splice(index, 1);
      sections.value.splice(newIndex, 0, movedSection);

      const [movedErrors] = errors.value.splice(index, 1);
      errors.value.splice(newIndex, 0, movedErrors);
    }
  };

  const openAddFieldModal = (sectionIndex: number) => {
    currentSectionIndex.value = sectionIndex;
    showModal.value = true;
  };

  const closeAddFieldModal = () => {
    showModal.value = false;
    modalField.value = { type: "text", label: "" };
  };

  const addFieldToCurrentSection = () => {
    if (currentSectionIndex.value !== null) {
      sections.value[currentSectionIndex.value].fields.push({
        type: modalField.value.type,
        label: modalField.value.label,
        value: "",
      });
      errors.value[currentSectionIndex.value].fields[
        sections.value[currentSectionIndex.value].fields.length - 1
      ] = "";
      closeAddFieldModal();
    }
  };

  const removeField = (sectionIndex: number, fieldIndex: number) => {
    sections.value[sectionIndex].fields.splice(fieldIndex, 1);
    errors.value[sectionIndex].fields = errors.value[
      sectionIndex
    ].fields.filter((_, index) => index !== fieldIndex);
  };

  const addFieldToAllSections = () => {
    sections.value.forEach((section) => {
      section.fields.push({
        type: globalField.value.type,
        label: globalField.value.label,
        value: "",
      });
    });
    errors.value.forEach((sectionErrors) => {
      sectionErrors.fields[sections.value[0].fields.length - 1] = "";
    });
    globalField.value = { type: "text", label: "" };
  };

  const getFieldComponent = (type: string) => {
    const components: { [key: string]: any } = {
      text: TextInput,
      email: TextInput,
      number: TextInput,
      date: DateInput,
      checkbox: CheckboxInput,
    };
    return components[type] || TextInput;
  };

  const validateField = (field: Field): string => {
    if (typeof field.value === "string") {
      switch (field.type) {
        case "text":
          if (!field.value) return "This field is required";
          break;
        case "email":
          if (!field.value) return "Email is required";
          if (!/\S+@\S+\.\S+/.test(field.value)) return "Invalid email address";
          break;
        case "date":
          if (!field.value) return "Date is required";
          break;
        default:
          break;
      }
    } else if (typeof field.value === "number") {
      if (field.type === "number") {
        if (isNaN(field.value) || field.value <= 0)
          return "Invalid number. Must be greater than 0";
      }
    } else if (typeof field.value === "boolean") {
    }

    return "";
  };

  const validateForm = (): boolean => {
    // Validate each section's fields
    const formErrors = sections.value.map((section) =>
      section.fields.map(validateField)
    );

    errors.value = formErrors.map((fields) => ({
      fields: fields.reduce<{ [key: number]: string }[]>(
        (acc, error, fieldIndex) => {
          if (error) acc[fieldIndex] = error;
          return acc;
        },
        []
      ),
    }));

    // Check if there are any errors
    return formErrors.flat().every((error) => !error);
  };

  const submitForm = () => {
    if (validateForm()) {
      alert("Form submitted successfully!");
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  return {
    sections,
    errors,
    globalField,
    showModal,
    currentSectionIndex,
    modalField,
    addSection,
    removeSection,
    moveSection,
    openAddFieldModal,
    closeAddFieldModal,
    addFieldToCurrentSection,
    removeField,
    addFieldToAllSections,
    getFieldComponent,
    validateForm,
    submitForm,
  };
}
