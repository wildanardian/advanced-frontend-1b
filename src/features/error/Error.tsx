import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Oops!";
  let message = "Terjadi kesalahan yang tidak terduga.";

  if (isRouteErrorResponse(error)) {
    // Error dari response, misal 404 atau 500
    title = `${error.status} ${error.statusText}`;
    message = error.data?.message ?? message;
  } else if (error instanceof Error) {
    // Error dari JS/runtime
    message = error.message;
  }

  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to="/">Kembali ke Beranda</Link>
    </div>
  );
}