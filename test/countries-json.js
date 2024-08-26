import test from 'ava';
import countries from '../countries.json' with { type: 'json' };

test('[countries.json] is valid, and can be imported', async t => {
	const data = await import('../countries.json', {with: {type: 'json'}});
	t.true(typeof data === 'object');
	t.truthy(data);
});

test('All country codes are two characters long', t => {
	const outliers = Object.keys(countries).filter(k => k.length !== 2);
	t.deepEqual(outliers, [], `Invalid length codes: ${outliers.join(', ')}`);
});

test('All country codes are UPPERCASE', t => {
	const outliers = Object.keys(countries).filter(k => k !== k.toUpperCase());
	t.deepEqual(outliers, [], `Invalid case codes: ${outliers.join(', ')}`);
});

test('All values must either be a string or an array', t => {
	const outliers = Object.entries(countries)
		.filter(([, value]) => typeof value !== 'string' && !Array.isArray(value))
		.map(v => v.join(':'));

	t.deepEqual(outliers, [], `Invalid value types: ${outliers.join(', ')}`);
});

test('All values must be unique', t => {
	const occurrences = {};

	function add(value) {
		const index = value.toLowerCase();

		if (occurrences[index] === undefined) {
			occurrences[index] = {n: 0, orig: {}};
		}

		occurrences[index].n++;
		occurrences[index].orig[value] = true;
	}

	for (const value of Object.values(countries)) {
		if (typeof value === 'string') {
			add(value);
			continue;
		}

		for (const v of value) {
			add(v);
		}
	}

	const offenders = Object.values(occurrences).filter(v => v.n > 1);

	if (offenders.length > 0) {
		const x = offenders.map(({n, orig}) => ({n, orig: Object.keys(orig).join(', ')}))
			.sort((a, b) => (a.n > b.n) ? -1 : 1)
			.map(({n, orig}) => `${n} occurences of ${orig}`);

		t.fail(`${offenders.length} non-unique values present:\n\t${x.join('\n\t')}`);
	}

	t.pass();
});
