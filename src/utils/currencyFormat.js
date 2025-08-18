//////////////////
// FOR CURRENCY //
/////////////////
export function formatPrice(value) {
        var formatter = new Intl.NumberFormat('nl-NL', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return formatter.format(value);
    }

    