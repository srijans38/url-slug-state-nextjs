import Link from 'next/link';

export default function FilterPage({
  params,
}: {
  params: { filter: Array<string> };
}) {
  return (
    <code>
      <pre>
        Parsed result: {JSON.stringify(parseUrl(params.filter?.[0]), null, 2)}
      </pre>
      <br />
      Examples Links :
      <br />
      <Link href="/marketplace/">default</Link>
      <br />
      <Link href="/marketplace/new-bikes-under-50000-rs">
        new-bikes-under-50000-rs
      </Link>
      <br />
      <Link href="/marketplace/used-cars-under-50000-rs-over-100000-rs">
        used-cars-under-50000-rs-over-100000-rs
      </Link>
      <br />
      <Link href="/marketplace/new-bikes-under-50000-rs-over-100000-rs-over-10000-kms">
        new-jeeps-under-50000-rs-over-100000-rs-over-10000-kms
      </Link>
      <br />
      <Link href="/marketplace/new-bikes-under-50000-rs-over-100000-rs-over-10000-kms-under-50-kms">
        new-bikes-under-50000-rs-over-100000-rs-over-10000-kms-under-50-kms
      </Link>
      <br />
      This is a list of all available options :
      <pre>{JSON.stringify(categories, null, 2)}</pre>
    </code>
  );
}

function parseUrl(urlSlug: string) {
  const splitSlug = urlSlug?.split('-');
  const result: Record<string, any> = {};

  for (const key in categories) {
    const category = categories[key];
    const { default: defaultValue, values, unit } = category;

    const index = splitSlug?.findIndex((slugPart, i) => {
      const nextSlugPart = splitSlug[i + 2];
      if (values.includes(slugPart)) {
        if (key.includes('min') || key.includes('max')) {
          return nextSlugPart === unit;
        }
        return true;
      }
      return false;
    });

    if (index !== undefined && index !== -1) {
      result[key] =
        key.includes('min') || key.includes('max')
          ? splitSlug?.[index + 1]
          : splitSlug?.[index];
    } else {
      result[key] = defaultValue;
    }
  }

  return result;
}

const categories: Record<
  string,
  {
    default: string | number;
    values: Array<string>;
    unit?: string;
  }
> = {
  cat1: { default: 'used', values: ['used', 'new'] },
  cat2: { default: 'cars', values: ['cars', 'bikes', 'jeeps'] },
  min_cat3: { default: 0, values: ['under'], unit: 'rs' },
  max_cat3: { default: 0, values: ['over'], unit: 'rs' },
  min_cat4: { default: 0, values: ['under'], unit: 'kms' },
  max_cat4: { default: 0, values: ['over'], unit: 'kms' },
};
