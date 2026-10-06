import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap notfound">
      <h1>404</h1>
      <p className="lead" style={{ margin: "0 auto 28px" }}>Cette page n&rsquo;est pas sur l&rsquo;étagère.</p>
      <Link className="btn" href="/">Retour à l&rsquo;accueil</Link>
    </div>
  );
}
