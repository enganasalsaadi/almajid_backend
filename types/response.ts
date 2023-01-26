interface ResponseType {
  meta: {
    status: number;
    message: string | null;
  };
  data: any | null;
}

export default ResponseType;
